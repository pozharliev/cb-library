import { createContext, useContext } from "react";
import useSWR from "swr";

type User = {
	id: string;
	fullName: string;
	firstName: string;
	email: string;
	role: string;
	sub: string;
};

type AuthResponse = {
	collection: string;
	exp: number;
	token: string;
	user: User;
};

type ContextType = {
	isAuthenticated: boolean;
	user: User | null;
	isLoading: boolean;
};

const AuthContext = createContext<ContextType>({
	isAuthenticated: false,
	user: null,
	isLoading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
	const { data, isLoading } = useSWR<AuthResponse, unknown>(
		"/users/me",
		{
			refreshInterval: 1000,
		}
	);
	
	const user = data?.user ?? null;

	return (
		<AuthContext.Provider value={{ isAuthenticated: user != null, user, isLoading }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
