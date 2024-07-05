'use client'

import React, { useState, useEffect } from "react";
import Link from "next/link";
// Import react scroll
import IconMenuDashboard from "@/assets/icon/menu/icon-menu-dashboard";
import IconMenuCharts from "@/assets/icon/menu/icon-menu-charts";
import IconMenuElements from "@/assets/icon/menu/icon-menu-elements";
import IconMenuUsers from "@/assets/icon/menu/icon-menu-users";
import IconMenuScrumboard from "@/assets/icon/menu/icon-menu-scrumboard";
import IconMenuContacts from "@/assets/icon/menu/icon-menu-contacts";

const Header = () => {
	const [activeLink, setActiveLink] = useState("/");
	const [scrollActive, setScrollActive] = useState(false);
	useEffect(() => {
		window.addEventListener("scroll", () => {
			setScrollActive(window.scrollY > 20);
		});
	}, []);
	return (
		<>
			{/*<header*/}
			{/*	className={*/}
			{/*		"fixed top-0 w-full z-30 bg-background transition-all " +*/}
			{/*		(scrollActive ? " shadow-md pt-0" : " pt-4")*/}
			{/*	}*/}
			{/*>*/}
			{/*	<nav className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto grid grid-flow-col py-3 sm:py-4">*/}
			{/*		<div className="col-start-1 col-end-2 flex items-center">*/}
			{/*			<img id='home'*/}
			{/*					 src="/assets/logo.png"*/}
			{/*					 className="h-14 w-auto mt-4 lg:mt-2"*/}
			{/*					 alt=""*/}
			{/*			/>*/}
			{/*		</div>*/}
			{/*		<ul className="hidden lg:flex col-start-4 col-end-8 text-black-500  items-center">*/}
			{/*			<LinkScroll*/}
			{/*				activeClass="active"*/}
			{/*				to="about"*/}
			{/*				spy={true}*/}
			{/*				smooth={true}*/}
			{/*				duration={1000}*/}
			{/*				onSetActive={() => {*/}
			{/*					setActiveLink("about");*/}
			{/*				}}*/}
			{/*				className={*/}
			{/*					"px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +*/}
			{/*					(activeLink === "about"*/}
			{/*						? " text-orange-500 animation-active "*/}
			{/*						: " text-black-500 hover:text-orange-500 a")*/}
			{/*				}*/}
			{/*			>*/}
			{/*				Trang chủ*/}
			{/*			</LinkScroll>*/}
			{/*			<LinkScroll*/}
			{/*				activeClass="active"*/}
			{/*				to="feature"*/}
			{/*				spy={true}*/}
			{/*				smooth={true}*/}
			{/*				duration={1000}*/}
			{/*				onSetActive={() => {*/}
			{/*					setActiveLink("feature");*/}
			{/*				}}*/}
			{/*				className={*/}
			{/*					"px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +*/}
			{/*					(activeLink === "feature"*/}
			{/*						? " text-orange-500 animation-active "*/}
			{/*						: " text-black-500 hover:text-orange-500 ")*/}
			{/*				}*/}
			{/*			>*/}
			{/*				Giới thiệu*/}
			{/*			</LinkScroll>*/}
			{/*			<LinkScroll*/}
			{/*				activeClass="active"*/}
			{/*				to="pricing"*/}
			{/*				spy={true}*/}
			{/*				smooth={true}*/}
			{/*				duration={1000}*/}
			{/*				onSetActive={() => {*/}
			{/*					setActiveLink("pricing");*/}
			{/*				}}*/}
			{/*				className={*/}
			{/*					"px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +*/}
			{/*					(activeLink === "pricing"*/}
			{/*						? " text-orange-500 animation-active "*/}
			{/*						: " text-black-500 hover:text-orange-500 ")*/}
			{/*				}*/}
			{/*			>*/}
			{/*				Đăng ký hồ sơ*/}
			{/*			</LinkScroll>*/}
			{/*			<LinkScroll*/}
			{/*				activeClass="active"*/}
			{/*				to="maps"*/}
			{/*				spy={true}*/}
			{/*				smooth={true}*/}
			{/*				duration={1000}*/}
			{/*				onSetActive={() => {*/}
			{/*					setActiveLink("maps");*/}
			{/*				}}*/}
			{/*				className={*/}
			{/*					"px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +*/}
			{/*					(activeLink === "maps"*/}
			{/*						? " text-orange-500 animation-active "*/}
			{/*						: " text-black-500 hover:text-orange-500 ")*/}
			{/*				}*/}
			{/*			>*/}
			{/*				Hoạt động Đào tạo*/}
			{/*			</LinkScroll>*/}
			{/*			<LinkScroll*/}
			{/*				activeClass="active"*/}
			{/*				to="testimoni"*/}
			{/*				spy={true}*/}
			{/*				smooth={true}*/}
			{/*				duration={1000}*/}
			{/*				onSetActive={() => {*/}
			{/*					setActiveLink("testimoni");*/}
			{/*				}}*/}
			{/*				className={*/}
			{/*					"px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +*/}
			{/*					(activeLink === "testimoni"*/}
			{/*						? " text-orange-500 animation-active "*/}
			{/*						: " text-black-500 hover:text-orange-500 ")*/}
			{/*				}*/}
			{/*			>*/}
			{/*				Tin tức*/}
			{/*			</LinkScroll>*/}
			{/*		</ul>*/}
			{/*		/!*<div className="col-start-10 col-end-12 font-medium flex justify-end items-center">*!/*/}
			{/*		/!*  <Link href="/">*!/*/}
			{/*		/!*    <a className="text-black-600 mx-2 sm:mx-4 capitalize tracking-wide hover:text-orange-500 transition-all">*!/*/}
			{/*		/!*        Sign In*!/*/}
			{/*		/!*    </a>*!/*/}
			{/*		/!*  </Link>*!/*/}
			{/*		/!*  <ButtonOutline>Sign Up</ButtonOutline>*!/*/}
			{/*		/!*</div>*!/*/}
			{/*	</nav>*/}
			{/*</header>*/}
			{/* Mobile Navigation */}

			<nav className="fixed lg:hidden bottom-0 left-0 right-0 z-50">
				<div className="bg-background px-4 shadow-2xl">
					<ul className="flex w-full justify-between items-center text-black-500">
						<Link
							href={"/"}
							onClick={() => {
								setActiveLink("/");
							}}
							className={
								"mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
								(activeLink === "/"
									? "  border-orange-500 text-orange-500 "
									: " border-transparent")
							}
						>
							{/*<svg*/}
							{/*	className={*/}
							{/*		"w-6 h-6 " +*/}
							{/*		(activeLink === "/"*/}
							{/*			? "  transform scale-125 "*/}
							{/*			: " ")*/}
							{/*	}*/}
							{/*	fill="none"*/}
							{/*	stroke="currentColor"*/}
							{/*	viewBox="0 0 24 24"*/}
							{/*	xmlns="http://www.w3.org/2000/svg"*/}
							{/*>*/}
							{/*	<path*/}
							{/*		strokeLinecap="round"*/}
							{/*		strokeLinejoin="round"*/}
							{/*		strokeWidth={2}*/}
							{/*		d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"*/}
							{/*	/>*/}
							{/*</svg>*/}
							<div
								className={
									(activeLink === "/"
										? "  transform scale-125 "
										: " ")
								}
									>
							<IconMenuDashboard/>
								</div>
							Nhật ký
						</Link>
						<Link
							href={"/thongtinchung"}
							onClick={() => {
								setActiveLink("/thongtinchung");
							}}
							className={
								"mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
								(activeLink === "/thongtinchung"
									? "  border-orange-500 text-orange-500"
									: " border-transparent ")
							}
						>
							<div
								className={
									(activeLink === "/thongtinchung"
										? "  transform scale-125 "
										: " ")
								}
							>
								<IconMenuContacts/>
							</div>
							Danh mục
						</Link>
						<Link
							href={"/phanthuoc"}
							onClick={() => {
								setActiveLink("/phanthuoc");
							}}
							className={
								"mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
								(activeLink === "/phanthuoc"
									? "  border-orange-500 text-orange-500"
									: " border-transparent ")
							}
						>
							<div
								className={
									(activeLink === "/phanthuoc"
										? "  transform scale-125 "
										: " ")
								}
							>
								<IconMenuElements/>
							</div>
							Phân thuốc
						</Link>
						
						<Link
							href={"/thongke"}
							onClick={() => {
								setActiveLink("/thongke");
							}}
							className={
								"mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
								(activeLink === "/thongke"
									? "  border-orange-500 text-orange-500"
									: " border-transparent ")
							}
						>
							<div
								className={
									(activeLink === "/thongke"
										? "  transform scale-125 "
										: " ")
								}
							>
								<IconMenuCharts/>
							</div>
							Thống kê
						</Link>

						<Link
							href={"/user"}
							onClick={() => {
								setActiveLink("/user");
							}}
							className={
								"mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
								(activeLink === "/user"
									? "  border-orange-500 text-orange-500"
									: " border-transparent ")
							}
						>
							<div
								className={
									(activeLink === "/user"
										? "  transform scale-125 "
										: " ")
								}
							>
								<IconMenuUsers/>
							</div>
							Người dùng
						</Link>
					</ul>
				</div>
			</nav>
			{/* End Mobile Navigation */}

		</>
	);
};

export default Header;
