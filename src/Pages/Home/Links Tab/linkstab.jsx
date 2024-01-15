import Button from "../../../Components/Button/index.jsx";
import Buttonsecondary from "../../../Components/Button Secondary/buttonsecondary.jsx";
import Linkscustomizationempty from "../../../Components/Links Customization Empty/linkscustomizationempty.jsx";
import Linkscustomization from "../../../Components/Links Customization/linkscustomization.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../../api/axios.js";
import { useContext } from "react";
import linkContext from "../../../../context/linkContext.jsx";
import LinkInputSkeleton from "../../../Components/LinkInputSkeleton/LinkInputSkeleton.jsx";
import useAuth from "../../../../hooks/useAuth.jsx";
import toast from "react-hot-toast";
import { closestCenter, DndContext } from "@dnd-kit/core";
import { motion, useIsPresent } from "framer-motion";
import {
    restrictToVerticalAxis,
    restrictToWindowEdges,
    restrictToFirstScrollableAncestor,
} from "@dnd-kit/modifiers";
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
const saveLinksEndpoint = "/link/save";

const linkPatterns = {
    GitHub: /^((https?:\/\/)?(www\.)?github\.com\/\S+)\/?$/i,
    Twitter: /^((https?:\/\/)?(www\.)?twitter\.com\/\S+)\/?$/i,
    LinkedIn: /^((https?:\/\/)?(www\.)?linkedin\.com\/in\/\S+)\/?$/i,
    YouTube: /^((https?:\/\/)?(www\.)?youtube\.com\/\S+)\/?$/i,
    Facebook: /^((https?:\/\/)?(www\.)?facebook\.com\/\S+)\/?$/i,
    Twitch: /^((https?:\/\/)?(www\.)?twitch\.tv\/\S+)\/?$/i,
    DevTo: /^((https?:\/\/)?(www\.)?dev\.to\/\S+)\/?$/i,
    CodeWars: /^((https?:\/\/)?(www\.)?codewars\.com\/users\/\S+)\/?$/i,
    CodePen: /^((https?:\/\/)?(www\.)?codepen\.io\/\S+)\/?$/i,
    FreeCodeCamp: /^((https?:\/\/)?(www\.)?freecodecamp\.org\/\S+)\/?$/i,
    GitLab: /^((https?:\/\/)?(www\.)?gitlab\.com\/\S+)\/?$/i,
    Hashnode: /^((https?:\/\/)?(www\.)?hashnode\.com\/@\S+\/?)$/i,
    StackOverflow:
        /^((https?:\/\/)?(www\.)?stackoverflow\.com\/users\/\S+)\/?$/i,
    FrontendMentor:
        /^((https?:\/\/)?(www\.)?frontendmentor\.io\/profile\/\S+)\/?$/i,
    WhatsApp: /^((https?:\/\/)?wa\.me\/\S+)\/?$/i,
    XDA: /^((https?:\/\/)?(www\.)?xdaforums\.com\/m\/\S+)\/?$/i,
    Instagram: /^((https?:\/\/)?(www\.)?instagram\.com\/\S+)\/?$/i,
    Discord: /^((https?:\/\/)?discord\.com\/users\/\S+)\/?$/i,
    Telegram: /^((https?:\/\/)?t\.me\/\S+)\/?$/i,
    Threads: /^((https?:\/\/)?threads\.com\/user\/\S+)\/?$/i,
    Website: /^((https?:\/\/)?\S+)\/?$/i,
    Reddit: /^((https?:\/\/)?(www\.)?reddit\.com\/user\/\S+)\/?$/i,
    Quora: /^((https?:\/\/)?(www\.)?quora\.com\/profile\/\S+)\/?$/i,
    TikTok: /^((https?:\/\/)?(www\.)?tiktok\.com\/@\S+)\/?$/i,
    Snapchat: /^((https?:\/\/)?(www\.)?snapchat\.com\/add\/\S+)\/?$/i,
    Tumblr: /^((https?:\/\/)?(www\.)?tumblr\.com\/\S*)$/i,
    Fiverr: /^((https?:\/\/)?(www\.)?fiverr\.com\/\S+)\/?$/i,
    Upwork: /^((https?:\/\/)?(www\.)?\.upwork\.com\/freelancers\/\S+)\/?$/i,
    Medium: /^((https?:\/\/)?medium\.com\/@\S+)\/?$/i,
};

const Linkstab = () => {
    const navigate = useNavigate();
    const isAuthenticated = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);
    const [isLoading, setIsLoading] = useState(true);
    const [disable, setDisable] = useState(false);

    const { linksData, updateLinksData, setLinksData } =
        useContext(linkContext);
    const [order, setOrder] = useState(1);

    useEffect(() => {
        (async () => {
            if (!isAuthenticated) {
                navigate("/login");
                return;
            }
            try {
                if (linksData.length === 0) {
                    const res = await axiosPrivate("/link");
                    res?.data?.links && setLinksData(res.data.links);
                }
                setIsLoading(false);
                return;
            } catch (error) {
                console.error(error);
                setIsLoading(false);
                return;
            }
        })();
    }, []);

    const onDragEnd = (event) => {
        const { active, over } = event;
        if (active.id === over.id) {
            return;
        }
        setLinksData((links) => {
            const oldIndex = links.findIndex(
                (link) => link.order === active.id
            );
            const newIndex = links.findIndex((link) => link.order === over.id);
            const newLinks = arrayMove(links, oldIndex, newIndex);
            const updatedLinks = newLinks.map((link, index) => ({
                ...link,
                order: index + 1,
            }));
            return updatedLinks;
        });
    };

    const handleAddLinkClick = () => {
        updateLinksData(order);
        // setOrder(1);
        setLinksData((prev) =>
            prev.map((link, index) => ({
                ...link,
                order: index + 1,
            }))
        );
    };
    const handleRemoveLink = (index) => {
        const updatedLinksData = linksData.filter((_, i) => i !== index);
        const updatedLinksDataWithOrder = updatedLinksData.map((link, i) => ({
            ...link,
            order: i + 1,
        }));
        setLinksData(updatedLinksDataWithOrder);
        setOrder(updatedLinksDataWithOrder.length + 1);
    };

    const saveToDB = async () => {
        try {
            setDisable(true);

            const invalidLink = linksData.find((link) => {
                const platform = link.platform.text;
                const pattern = linkPatterns[platform];
                return !pattern.test(link.link);
            });

            if (invalidLink) {
                toast.error("Invalid link. Couldn't save. Try again.", {
                    duration: 2000,
                    position: "bottom-center",
                    style: {
                        backgroundColor: "var(--black-90-)",
                        color: "var(--white-90-)",
                    },
                });
                return;
            }

            const res = await axiosPrivate.post(saveLinksEndpoint, linksData);
            toast.success("Updated successfully!", {
                duration: 2000,
                position: "bottom-center",
                style: {
                    backgroundColor: "var(--black-90-)",
                    color: "var(--white-90-)",
                },
            });
            return;
        } catch (error) {
            console.log(error);
            toast.error("Couldn't save. Try again.", {
                duration: 2000,
                position: "bottom-center",
                style: {
                    backgroundColor: "var(--black-90-)",
                    color: "var(--white-90-)",
                },
            });
            return;
        } finally {
            setDisable(false);
        }
    };
    const isPresent = useIsPresent();
    return (
        <>
            <div className="links-customization">
                <div className="links-customization-header">
                    <h2>Customize your links</h2>
                    <p>
                        Add/edit/remove links below and then share all your
                        profiles with the world!
                    </p>
                </div>
                <Buttonsecondary
                    buttonSecondaryText="+ Add new link"
                    onClick={handleAddLinkClick}
                />
                <div className="links-customization-main">
                    <DndContext
                        collisionDetection={closestCenter}
                        onDragEnd={onDragEnd}
                        modifiers={[
                            restrictToVerticalAxis,
                            restrictToWindowEdges,
                            restrictToFirstScrollableAncestor,
                        ]}
                    >
                        <SortableContext
                            items={
                                linksData
                                    ? linksData.map((link) => link.order)
                                    : []
                            }
                            strategy={verticalListSortingStrategy}
                        >
                            {isLoading ? (
                                <>
                                    <LinkInputSkeleton />
                                    <LinkInputSkeleton />
                                </>
                            ) : linksData && linksData.length ? (
                                linksData.map((link, ind) => (
                                    <Linkscustomization
                                        key={`${link.link}-${link.order}`}
                                        link={link || ""}
                                        order={link.order}
                                        index={ind}
                                        loading={isLoading}
                                        platform={link.platform.text || ""}
                                        onRemove={handleRemoveLink}
                                    />
                                ))
                            ) : (
                                <Linkscustomizationempty />
                            )}
                        </SortableContext>
                    </DndContext>
                </div>
            </div>
            <div className="links-customization-footer">
                <div className="links-customization-footer-btn">
                    <Button
                        disabled={disable}
                        loadingText={disable && "Saving..."}
                        handleClick={saveToDB}
                        buttonText="Save"
                    />
                </div>
            </div>
            <motion.div
                initial={{ scaleX: 1 }}
                animate={{
                    scaleX: 0,
                    transition: { duration: 0.6, ease: [0.83, 0, 0.17, 1] },
                }}
                exit={{
                    scaleX: 1,
                    transition: { duration: 0.6, ease: [0.83, 0, 0.17, 1] },
                }}
                style={{
                    originX: isPresent ? 0 : 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                className="privacy-screen"
            >
                <h1 style={{ color: "white" }}>"Links"</h1>
            </motion.div>
        </>
    );
};

export default Linkstab;
