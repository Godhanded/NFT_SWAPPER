import React from "react";
import { NavLink } from "react-router-dom";
import { RiHistoryLine } from "react-icons/ri";
import { BsWallet } from "react-icons/bs";
import { TbHeartbeat } from "react-icons/tb";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";


const SideBar = () => {
    return (
            <div className="hidden md:flex flex-col items-start gap-4 h-full bg-white">
                <div className="flex flex-col items-start gap-y-6 w-full pt-8 px-8">
                    <NavLink to="/dashboard/swap" className={({ isActive }) =>
                        "flex items-center gap-x-3 w-full trans " + (isActive ? "bg-[#F00530] bg-opacity-10 text-[#F00530] before-sidebar" : "text-[#333333] bg-transparent")
                    }
                    >
                        <div className="flex items-center gap-2 w-full py-3 px-2">
                            <TbHeartbeat className="h-6 w-6 ml-2" />
                            <p>Swap</p>
                        </div>
                    </NavLink>
                    <NavLink to="/dashboard/pool" className={({ isActive }) =>
                        "flex items-center gap-x-3 w-full trans " + (isActive ? "bg-[#F00530] bg-opacity-10 text-[#F00530] before-sidebar" : "text-[#333333] bg-transparent")
                    }
                    >
                        <div className="flex items-center gap-2 w-full py-3 px-2">
                            <BsWallet className="h-6 w-6 ml-2" />
                            <p>Pool</p>
                        </div>
                    </NavLink>
                    <NavLink to="/dashboard/board-center"
                        className={({ isActive }) =>
                            "flex items-center gap-x-3 w-full trans " + (isActive ? "bg-[#F00530] bg-opacity-10 text-[#F00530] before-sidebar" : "text-[#333333] bg-transparent")
                        }
                    >
                        <div className="flex items-center gap-2 w-full py-3 px-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
                            </svg>
                            <p>Bond Center</p>
                        </div>
                    </NavLink>
                    <NavLink to="/dashboard/old-deals"
                        className={({ isActive }) =>
                            "flex items-center gap-x-3 w-full trans " + (isActive ? "bg-[#F00530] bg-opacity-10 text-[#F00530] before-sidebar" : "text-[#333333] bg-transparent")
                        }
                    >
                        <div className="flex items-center gap-2 w-full py-3 px-2">
                            <RiHistoryLine className="h-6 w-6 ml-2" />
                            <p>Fullfilled Deals</p>
                        </div>
                    </NavLink>
                    <NavLink to="/dashboard/settings"
                        className={({ isActive }) =>
                            "flex items-center gap-x-3 w-full trans " + (isActive ? "bg-[#F00530] bg-opacity-10 text-[#F00530] before-sidebar" : "text-[#333333] bg-transparent")
                        }
                    >
                        <div className="flex items-center gap-2 w-full py-3 px-2">
                            <Cog6ToothIcon className="h-6 w-6 ml-2" />
                            <p>Settings</p>
                        </div>
                    </NavLink>
                </div>
            </div>
    );
};

export default SideBar;

