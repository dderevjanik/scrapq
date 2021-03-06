import { scrap, $ } from "../../lib";
import { html } from "../data";

describe("link", () => {
	it("should get link from <a/>", () => {
		const result = scrap(html, $.link("a"));
		expect(result).toBe("/read-more");
	});

	it("should get length of the link from <a/>", () => {
		const result = scrap(html, $.link("a", link => link.length));
		expect(result).toBe(10);
	});

	// it("should not get link from title", () => {
	//     const result = scrap(html, $.link('h1'));
	//     expect(result).toBe("");
	// });

	// it("should not get link non existing element", () => {
	//     const result = scrap(html, $.link('h3'));
	//     expect(result).toBe("");
	// });

	it("should link using query", () => {
		const result = scrap(html, {
			href: $.link("a")
		});
		expect(result.href).toBe("/read-more");
	});
});
