import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tlrslrgqvxhjdajpayfb.supabase.co";
const supabaseAnonKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRscnNscmdxdnhoamRhanBheWZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU4NjY5MjQsImV4cCI6MjAzMTQ0MjkyNH0.mE6EeP3svonkMnpJUMRvnJ07bx66VUE8KL3DKi0p5I4";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	auth: {
		storage: AsyncStorage,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
});

// Asks the supabase server if the user is logged in.
// Returns false if the user is not logged, or user session iformation in an object otherwise.
export async function getSession() {
	const { data, error } = await supabase.auth.getSession();

	if (error) {
		Promise.reject(error);
	}

	return data.session === null ? false : data.session.user.user_metadata;
}
