import {
	AuthBindings,
	Authenticated,
	GitHubBanner,
	Refine,
} from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
	ErrorComponent,
	RefineSnackbarProvider,
	ThemedLayoutV2,
	useNotificationProvider,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
	CatchAllNavigate,
	DocumentTitleHandler,
	NavigateToResource,
	UnsavedChangesNotifier,
} from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";
import axios from "axios";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { CredentialResponse } from "./interfaces/google";
import {
	BlogPostCreate,
	BlogPostEdit,
	BlogPostList,
	BlogPostShow,
} from "./pages/blog-posts";
import {
	CategoryCreate,
	CategoryEdit,
	CategoryList,
	CategoryShow,
} from "./pages/categories";
import { Home, MyProfile } from "./pages";
import { Login } from "./pages/login";
import { AgentProfile, Agents } from "./pages/agent";
import {
	AllProperties,
	CreateProperty,
	EditProperty,
	PropertyDetails,
} from "./pages/properties";
import { parseJwt } from "./utils/parse-jwt";

import { MuiInferencer } from "@refinedev/inferencer/mui";
import {
	AccountCircleOutlined,
	ChatBubbleOutline,
	PeopleAltOutlined,
	StarOutlineRounded,
	VillaOutlined,
} from "@mui/icons-material";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (config.headers) {
		config.headers["Authorization"] = `Bearer ${token}`;
	}

	return config;
});

function App() {
	const authProvider: AuthBindings = {
		login: async ({ credential }: CredentialResponse) => {
			const profileObj = credential ? parseJwt(credential) : null;

			if (profileObj) {
				const response = await fetch("http://localhost:5000/api/v1/users", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						name: profileObj.name,
						email: profileObj.email,
						avatar: profileObj.picture,
					}),
				});
				const data = await response.json();

				if (response.status == 200) {
					localStorage.setItem(
						"user",
						JSON.stringify({
							...profileObj,
							avatar: profileObj.picture,
							userId: data._id,
						})
					);
				} else {
					return Promise.reject();
				}

				localStorage.setItem("token", `${credential}`);

				return {
					success: true,
					redirectTo: "/",
				};
			}

			return {
				success: false,
			};
		},
		logout: async () => {
			const token = localStorage.getItem("token");

			if (token && typeof window !== "undefined") {
				localStorage.removeItem("token");
				localStorage.removeItem("user");
				axios.defaults.headers.common = {};
				window.google?.accounts.id.revoke(token, () => {
					return {};
				});
			}

			return {
				success: true,
				redirectTo: "/login",
			};
		},
		onError: async (error) => {
			console.error(error);
			return { error };
		},
		check: async () => {
			const token = localStorage.getItem("token");

			if (token) {
				return {
					authenticated: true,
				};
			}

			return {
				authenticated: false,
				error: {
					message: "Check failed",
					name: "Token not found",
				},
				logout: true,
				redirectTo: "/login",
			};
		},
		getPermissions: async () => null,
		getIdentity: async () => {
			const user = localStorage.getItem("user");
			if (user) {
				return JSON.parse(user);
			}

			return null;
		},
	};

	return (
		<BrowserRouter>
			<GitHubBanner />
			<RefineKbarProvider>
				<ColorModeContextProvider>
					<CssBaseline />
					<GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
					<RefineSnackbarProvider>
						<DevtoolsProvider>
							<Refine
								dataProvider={dataProvider("http://localhost:5000/api/v1")} //https://api.fake-rest.refine.dev
								notificationProvider={useNotificationProvider}
								routerProvider={routerBindings}
								authProvider={authProvider}
								resources={[
									{
										name: "Dashboard",
										options: { label: "Dashboard" },
										list: "/dashboard",
										icon: <VillaOutlined />,
									},
									{
										name: "properties",
										//options: { label: "properties" },
										list: "/properties",
										show: "/properties/details/:id",
										create: "/properties/create",
										edit: "/properties/edit",
										meta: {
											canDelete: true,
										},
										icon: <ChatBubbleOutline />,
										// name: "property",
										// list: MuiInferencer,
										// create: "/blog-posts/create",
										// edit: "/blog-posts/edit/:id",
										// show: "/blog-posts/show/:id",
										// meta: {
										// 	canDelete: true,
										// },
									},
									{
										name: "my-profile",
										options: { label: "My Profile" },
										list: "/my-profile",
										icon: <AccountCircleOutlined />,
									},

									{
										name: "review",
										list: MuiInferencer,
										icon: <StarOutlineRounded />,
									},
									{
										name: "agent",
										list: MuiInferencer,
										icon: <PeopleAltOutlined />,
									},
									{
										name: "message",
										list: MuiInferencer,
										icon: <ChatBubbleOutline />,
									},
								]}
								options={{
									syncWithLocation: true,
									warnWhenUnsavedChanges: true,
									useNewQueryKeys: true,
									projectId: "nV9yrf-7nb1Gx-DlngMP",
								}}
							>
								<Routes>
									<Route
										element={
											<Authenticated
												key="authenticated-inner"
												fallback={<CatchAllNavigate to="/login" />}
											>
												<ThemedLayoutV2 Header={Header}>
													<Outlet />
												</ThemedLayoutV2>
											</Authenticated>
										}
									>
										<Route
											index
											element={<Home />} //{<NavigateToResource resource="blog_posts" />}
										/>
										<Route path="/dashboard">
											<Route index element={<Home />} />
										</Route>
										<Route path="/properties">
											<Route index element={<AllProperties />} />
											<Route path="details/:id" element={<PropertyDetails />} />
											<Route path="create" element={<CreateProperty />} />
											<Route path="edit/:id" element={<EditProperty />} />
										</Route>
										<Route path="/blog-posts">
											<Route index element={<BlogPostList />} />
											<Route path="create" element={<BlogPostCreate />} />
											<Route path="edit/:id" element={<BlogPostEdit />} />
											<Route path="show/:id" element={<BlogPostShow />} />
										</Route>
										<Route path="/my-profile">
											<Route index element={<MyProfile />} />
										</Route>
										<Route path="*" element={<ErrorComponent />} />
									</Route>
									<Route
										element={
											<Authenticated
												key="authenticated-outer"
												fallback={<Outlet />}
											>
												<NavigateToResource />
											</Authenticated>
										}
									>
										<Route path="/login" element={<Login />} />
									</Route>
								</Routes>

								<RefineKbar />
								<UnsavedChangesNotifier />
								<DocumentTitleHandler />
							</Refine>
							<DevtoolsPanel />
						</DevtoolsProvider>
					</RefineSnackbarProvider>
				</ColorModeContextProvider>
			</RefineKbarProvider>
		</BrowserRouter>
	);
}

export default App;
