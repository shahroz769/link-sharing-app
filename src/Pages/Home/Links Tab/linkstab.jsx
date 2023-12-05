import Button from "../../../Components/Button/index.jsx";
import Buttonsecondary from "../../../Components/Button Secondary/buttonsecondary.jsx";
import Linkscustomizationempty from "../../../Components/Links Customization Empty/linkscustomizationempty.jsx";
import Linkscustomization from "../../../Components/Links Customization/linkscustomization.jsx";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../../api/axios.js";
import { useContext } from "react";
import linkContext from "../../../../context/linkContext.jsx";
import useAuth from "../../../../hooks/useAuth.jsx";
import toast from "react-hot-toast";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
    restrictToVerticalAxis,
    restrictToWindowEdges,
    restrictToFirstScrollableAncestor,
} from "@dnd-kit/modifiers";
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const getLinksEndpoint = "/link";
const saveLinksEndpoint = "/link/save";

const Linkstab = () => {
    const linksCustomizationMainRef = useRef(null);
    const shouldScrollToBottomRef = useRef(false);
    const navigate = useNavigate();
    const isAuthenticated = useAuth();
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);
    const { linksData, updateLinksData, setLinksData } =
        useContext(linkContext);
    const [order, setOrder] = useState(linksData.length + 1);
    useEffect(() => {
        (async () => {
            try {
                const res = await axiosPrivate(getLinksEndpoint);
                res?.data?.links && setLinksData(res.data.links);
                res?.data?.links && setOrder(res.data.links.length + 1);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const onDragEnd = (event) => {
        const { active, over } = event;
        console.log(event);
        if (active.id === over.id) {
            return;
        }
        setLinksData((links) => {
            const oldIndex = links.findIndex(
                (link) => link.order === active.id,
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

    const end = () => {
        const updatedLinksDataWithOrder = linksData.map((link, i) => ({
            ...link,
            order: i + 1,
        }));
        setLinksData(updatedLinksDataWithOrder);
    };

    const handleAddLinkClick = () => {
        updateLinksData(order);
        setOrder(order + 1);
        // Set the flag to true when the "Add new link" button is clicked
        shouldScrollToBottomRef.current = true;
    };
    useEffect(() => {
        if (shouldScrollToBottomRef.current) {
            // Scroll to the bottom when linksData changes and the flag is true
            linksCustomizationMainRef.current.scrollTop =
                linksCustomizationMainRef.current.scrollHeight;
            // Reset the flag to false after scrolling
            shouldScrollToBottomRef.current = false;
        }
    }, [linksData]);

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
        console.log(linksData);
        try {
            const res = await axiosPrivate.post(saveLinksEndpoint, linksData);
            console.log(res);
            toast.success("Links saved successfully!", {
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
        }
    };

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
                <div
                    className="links-customization-main"
                    ref={linksCustomizationMainRef}
                >
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
                            items={linksData.map((link) => link.order)}
                            strategy={verticalListSortingStrategy}
                        >
                            {linksData?.length ? (
                                linksData.map((link, ind) => {
                                    return (
                                        <Linkscustomization
                                            key={link.link}
                                            link={link || ""}
                                            order={link.order}
                                            index={ind}
                                            // link={link.link || ""}
                                            platform={link.platform.text || ""}
                                            onRemove={handleRemoveLink}
                                        />
                                    );
                                })
                            ) : (
                                <Linkscustomizationempty />
                            )}
                        </SortableContext>
                    </DndContext>
                </div>
            </div>
            <div className="links-customization-footer">
                <div className="links-customization-footer-btn">
                    <Button handleClick={saveToDB} buttonText="Save" />
                </div>
            </div>
        </>
    );
};

export default Linkstab;
