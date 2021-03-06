import { scrap, $ } from '../lib';

const STR_TO_SCRAP = `
    <h1 class="title">Hello</h1>
    <ul>
        <li><span>Guten Tag</span></li>
        <li><span class="msg">Ciao</span></li>
        <li><span>Bonjour</span></li>
    </ul>
    <a href="/read-more">read more ...</a>
`;

describe('Basic', () => {

    it('should scrap <h1/> text from string', () => {
        const result = scrap(STR_TO_SCRAP, {
            title: $.text('h1.title')
        });
        expect(result).toEqual({ title: 'Hello'});
    });

    it('should scrap attributes from <h1/>', () => {
        const result = scrap(STR_TO_SCRAP, {
            title: $.attr('h1.title', 'class')
		});
        expect(result).toEqual({ title: 'title'});
    });

    it('should scrap items from <span/>', () => {
        const result = scrap(STR_TO_SCRAP, {
            items: $.list('li', {
                text: $.text('span')
            })
        });
        expect(result.items.length).toBe(3);
        expect(result.items[2].text).toBe('Bonjour')
    });

    it('should exists .title', () => {
        const result = scrap(STR_TO_SCRAP, {
            hasTitle: $.exists('h1.title')
        });
        expect(result.hasTitle).toBe(true);
    });

    it('should not exists .castle', () => {
        const result = scrap(STR_TO_SCRAP, {
            hasCastle: $.exists('.castle')
        });
        expect(result.hasCastle).toBe(false);
    });

    it('should exists .msg inside list', () => {
        const result = scrap(STR_TO_SCRAP, {
            items: $.list('li', {
                hasMsg: $.exists('span.msg')
            })
        });
        expect(result.items.length).toBe(3);
        expect(result.items[0].hasMsg).toBe(false);
        expect(result.items[1].hasMsg).toBe(true);
        expect(result.items[2].hasMsg).toBe(false);
    });

    it('should scrap text from <li><span/>', () => {
        const result = scrap(STR_TO_SCRAP, {
            items: $.list('li', {
                text: $.text('span')
            })
        });
        expect(result.items.length).toBe(3);
        expect(result.items[2].text).toBe('Bonjour')
    });

    it('should scrap text from <span/> by omitting <li/>', () => {
        const result = scrap(STR_TO_SCRAP, {
            items: $.list('span', {
                text: $.text('')
            })
        });
        expect(result.items.length).toBe(3);
        expect(result.items[2].text).toBe('Bonjour')
    });

    it('should use custom selector', () => {
        const result = scrap(STR_TO_SCRAP, {
            title: $.select('h1', (el) => el.text())
        });
        expect(result.title).toBe('Hello');
    });

    it('should get list of texts', () => {
        const result = scrap(STR_TO_SCRAP, {
            texts: $.list('li', $.text('span'))
        });
        expect(result.texts).toEqual([
            'Guten Tag',
            'Ciao',
            'Bonjour'
        ]);
    });

    it('should user deep query', () => {
        const result = scrap(STR_TO_SCRAP, {
            title: $.text('.title'),
            data: {
                msg: $.text('.msg')
            }
        });
        expect(result.title).toBe('Hello');
        expect(result.data.msg).toBe('Ciao');
    });

    it('should count <span/> elements', () => {
        const result = scrap(STR_TO_SCRAP, {
            spanCount: $.count('span')
        });
        expect(result.spanCount).toBe(3);
    });

    it('should count not exists element', () => {
        const result = scrap(STR_TO_SCRAP, {
            spanCount: $.count('table')
        });
        expect(result.spanCount).toBe(0);
    });

    it('should get link from an <a/> element', () => {
        const result = scrap(STR_TO_SCRAP, {
            link: $.link('a')
        });
        expect(result.link).toBe('/read-more');
    });

    it('should not get link from non-existing element', () => {
        const result = scrap(STR_TO_SCRAP, {
            link: $.link('tr')
        });
        expect(result.link).toBeUndefined();
    });

    it('should use predicate filter on list selector', () => {
        const result = scrap(STR_TO_SCRAP, {
            items: $.list('span', {
                msg: $.text('')
            }, (el) => el.hasClass('msg'))
        });
        expect(result.items[0].msg).toBe('Ciao');
    });

    it('should use only selector to scrap title', () => {
        const title = scrap(STR_TO_SCRAP, $.text('.title'));
        expect(title).toBe('Hello');
    });

    it('should use only selector to scrap <span/>', () => {
        const spans = scrap(STR_TO_SCRAP, $.list('span', $.text('')));
        expect(spans.length).toBe(3);
        expect(spans[0]).toBe('Guten Tag');
    });

    it('should use truthy condition', () => {
        const result = scrap(STR_TO_SCRAP, $.if('.title', (el) => !!el, $.text('.title'), $.text('.msg')));
        expect(result).toBe('Hello');
    });

    it('should use falsey condition', () => {
        const result = scrap(STR_TO_SCRAP, $.if('.notexisting', (el) => !el, $.text('.title'), { msg: $.text('.msg') }));
        expect(result).toEqual({ msg: 'Ciao' });
    });

});
