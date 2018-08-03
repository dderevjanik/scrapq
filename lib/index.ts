export { Query, Selector, TypeOfSelector, TypeOfQuery } from './types';
export { ScrapQuery, ScrapSelector, scrap } from './scrapper';
export { attrCreator as attr } from './selectors/attr';
export { existsCreator as exists } from './selectors/exists';
export { htmlCreator as html } from './selectors/html';
export { listCreator as list } from './selectors/list';
export { textCreator as text } from './selectors/text';
export { selectCreator as select } from "./selectors/select";

import { attrCreator as attr } from './selectors/attr';
import { existsCreator as exists } from './selectors/exists';
import { htmlCreator as html } from './selectors/html';
import { listCreator as list } from './selectors/list';
import { textCreator as text } from './selectors/text';
import { selectCreator as select } from "./selectors/select";

export const Q = {
	attr,
	exists,
	html,
	list,
	text,
	select
};

