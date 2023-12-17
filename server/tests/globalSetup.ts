import passport from "passport";
import MockStrategy, { connectPassport, setupSerializeAndDeserialize } from "passport-mock-strategy";
import payload from "payload";

const globalSetup = async (): Promise<void> => {
	passport.use(new MockStrategy({
		name: "mock",
		user: {},
	}, (user, done) => {
		console.log(user);
		done(user);
	}));

	setupSerializeAndDeserialize(passport, null, (id, done) => {
		done(id);
	});


	connectPassport(payload.express, passport);

	const response = await fetch("http://127.0.0.1:3000/oauth2/callback", {
		method: "get",
	}).then(res => res.text()).catch(console.log);

	console.log(response);

};

export default globalSetup;
