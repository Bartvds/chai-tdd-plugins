# TDD-style assertions for Chai.js plugins

> Collection of signature **proposals** for TDD-style assertions for the listed chai plugins. Goal is to have the basic assertions of all plugins accessible in TDD without method-name collisions.

### Notes

* In implementation all assertions would have the optional message parameter, but I left it out for review clarity.
* Ideally the TDD asserts would later merge into their respective plugin modules for easy install.
* I added the standard assertions on bottom of document for easy review
* Besides exposing the plugins as sweet sugared TDD there is an additional goal to export these to TypeScript type definitions. Using type info in BDD dot nation is hard to declare and ~~annoying~~ less useful in IDE's with auto-suggest. Compare navigating [this](https://github.com/borisyankov/DefinitelyTyped/blob/master/chai/chai.d.ts) to [these](https://github.com/borisyankov/DefinitelyTyped/blob/master/chai/chai-assert.d.ts).

### Todo

* If the signatures seem sensible the lists needs a sweep for suitable negation candidates, but again I left them out for clarity.

### History

* `2013-06-06` - Implemented and pushed `chai-fuzzy` 
* `2013-05~23` - Initial collection of the plugins, their assertions and ***possible*** signatures. This version still has errors, assumptions, complications and some collisions. Mainly `chai-sinon` and `chai-spy`. Also `chai-things` looks *interesting* to wrap.

### Tool

There's a crude `collide.js` script to de-dupe statements in this document, run it with node.js from your console like `$ node collide`. It will save its console output similar to [collide.log](https://github.com/Bartvds/chai-tdd-plugins/blob/master/collide.log)

## Overview

### Listed plugins

* chai-fuzzy
* chai-stats
* chai-http
* chai-jquery
* chai-interface
* chai-things
* chai-as-promissed
* chai-spies
* chai-sinon
* chai-changes
* chai-backbone

### Tools & utils

* chai-null
* chai-factories
* chai-timers

## Assertions

### chai-fuzzy

[chaijs.com/plugins/chai-fuzzy](http://chaijs.com/plugins/chai-fuzzy)

* 2012-06-06 - implemented in plugin, pull-request  

````js
assert.like(subject, value)
	expect(subject).to.be.like({a: 'a'})
assert.containOneLike(subject, value)
	expect(subject).to.be.containOneLike('cow patties')
assert.jsonOf(subject, value)
	expect(subject).to.be.jsonOf(apple)
````

### chai-stats

[chaijs.com/plugins/chai-stats](http://chaijs.com/plugins/chai-stats)

* Adding a prefix for sum/mean

````js
//2 existing
assert.almostEqual(3.1416, 3.14159, 3, 'these numbers are almost equal')
assert.deepAlmostEqual({ pi: 3.1416 }, { pi: 3.14159 }, 3)
````
````js
//non existing
assert.sumEqual(values, compare)
	expect([ 1, 2, 3 ]).to.have.sum.equal(6)
assert.sumAbove(values, compare)
	expect([ 1, 2, 3 ]).to.have.sum.above(5)
assert.sumBelow(values, compare)
	expect([ 1, 2, 3 ]).to.have.sum.below(7)

assert.meanEqual(values, compare)
	expect([ 1, 2, 3 ]).to.have.mean.equal(6)
assert.meanAbove(values, compare)
	expect([ 1, 2, 3 ]).to.have.mean.above(5)
assert.meanBelow(values, compare)
	expect([ 1, 2, 3 ]).to.have.mean.below(7)

//not sure on these argument names: (what do the numbers mean?)
assert.deviationAlmost(values, deviation, compare)
	expect([ 1, 2, 3, 4 ]).to.have.deviation.almost.equal(1.290, 2)
````

### chai-http

[chaijs.com/plugins/chai-http](http://chaijs.com/plugins/chai-http)

* Maybe a http-prefix for status and content type? Rest seems OK.

````js
//or plain?
assert.status(req, code)
	expect(res).to.have.status(200)
//add prefix?
assert.httpStatus(req, code)

assert.header(req, name)
	expect(req).to.have.header('x-api-key')

assert.headerValue(req, name, value)
	expect(req).to.have.header('content-type', 'text/plain')

assert.headers(req)
	expect(req).to.have.headers;

assert.ip(value)
	expect('127.0.0.1').to.be.an.ip;
	expect('2001:0db8:85a3:0000:0000:8a2e:0370:7334').to.be.an.ip;

//prefix as these are common names
assert.contentTypeJson(req)
	expect(req).to.be.json;
assert.contentTypeHtml(req)
	expect(req).to.be.html;
assert.contentTypeText(req)
	expect(req).to.be.text;
assert.contentType(req, contentType)
	//this should exist as well
````

### chai-jquery

[chaijs.com/plugins/chai-jquery](http://chaijs.com/plugins/chai-jquery)

* I think these need some prefixing as these names are very common, but which one? 

	jQuery? dom? html? elem? selection?

````js
assert.attr(query, name[, value])
	expect($('body')).to.have.attr('foo', 'bar')
	//RegExp could be param checked in implementation
	expect($('body')).to.have.attr('foo').match(/bar/)

assert.css(query, name[, value])
	expect($('body')).to.have.css('background-color', '#ffffff')
	//RegExp could be param checked in implementation
	expect($('body')).to.have.css('font-family').match(/sans-serif/)

assert.data(query, name[, value])
	expect($('body')).to.have.data('foo', 'bar')
	//RegExp could be param checked in implementation
	expect($('body')).to.have.data('foo').match(/bar/)

assert.class(query, className)
	expect($('body')).to.have.class('foo')

assert.id(query, id)
	expect($('body')).to.have.id('foo')

assert.html(query, html)
	expect($('#title')).to.have.html('Chai Tea')

assert.text(query, text)
	expect($('#title')).to.have.text('Chai Tea')

assert.value(query, value)
	expect($('.year')).to.have.value('2012')

assert.visible(query)
	expect($('.year')).to.be.visible;

assert.hidden(query)
	expect($('.year')).to.be.hidden;

assert.selected(query)
	expect($('option')).not.to.be.selected;

assert.checked(query)
	expect($('input')).not.to.be.checked;

assert.disabled(query)
	expect($('input')).not.to.be.disabled;

assert.empty(query)
	expect($('body')).not.to.be.empty;

assert.exist(query)
	expect($('#nonexistent')).not.to.exist;

assert.match(query, selector)
	// be(selector) not necesary
	expect($('#empty')).to.be(':empty')

assert.contain(query, text)
	expect($('#content')).to.contain('text')

assert.have(query, selector)
	expect($('#content')).to.have('div')
````

### chai-interface

[chaijs.com/plugins/chai-interface](http://chaijs.com/plugins/chai-interface)

* Isn't interface is reserved word? Does it matter?

````js
assert.interface(object, struct)
	expect([ 1, 2, 3, 4 ]).to.have.interface(struct)
````

### chai-things

[chaijs.com/plugins/chai-things](http://chaijs.com/plugins/chai-things)

* This one is tricky because it applies existing assertions over the array elements. Needs some thought on how to do this properly.

````js
assert.someIn.<any assertion>
	expect(.should.not.include({ a: 'cat' })

		Use the something property on an array to test whether the assertion holds for one of its elements.

		// Although they are equal, two different { a: 'cat' } objects are not the same
		[{ a: 'cat' }, { a: 'dog' }].should.not.include({ a: 'cat' })
		// Chai Things allows us to test deep equality on one of the elements
		[{ a: 'cat' }, { a: 'dog' }].should.include.something.that.deep.equals({ a: 'cat' })
		// If the test fails, we get a descriptive message
		[{ a: 'cat' }, { a: 'dog' }].should.include.something.that.deep.equals({ a: 'cow' })
		/* expected an element of [ { a: 'cat' }, { a: 'dog' } ] to deeply equal { a: 'cow' } */

		You are free to choose the syntactic variant you like most:

		[4, 11, 15].should.include.one.below(10)
		[4, 11, 15].should.contain.some.above(10)
		[4, 11, 15].should.not.contain.any.above(20)
		[{ a: 'cat' }, { a: 'dog' }].should.contain.a.thing.with.property('a', 'cat')
		[{ a: 'cat' }, { a: 'dog' }].should.contain.an.item.with.property('a', 'dog')

assert.allIn.<any assertion>

	Use the all property on an array to test whether the assertion holds for all its elements.

		// All items are below 20
		[4, 11, 15].should.all.be.below(20)
		// All items have a property 'a'
		[{ a: 'cat' }, { a: 'dog' }].should.all.have.property('a')
		// If the test fails, we get a descriptive message
		[4, 11, 15].should.all.be.above(20)
		/* expected all elements of [ 4, 11, 15 ] to be above 20 */
		[{ a: 'cat' }, { a: 'dog' }].should.all.have.property('a', 'cat')
		/* expected all elements of [ { a: 'cat' }, { a: 'dog' } ] to have a property 'a' of 'cat', but got 'dog' */
````

### chai-as-promised 

[chaijs.com/plugins/chai-as-promised](http://chaijs.com/plugins/chai-as-promised)

* These exists already! Need to verify completeness with author

````js
assert.eventually. <all asserts>
assert.isFulfilled(promise, "optional message")
assert.isRejected(promise, "optional message")
assert.isRejected(promise, Error, "optional message")
assert.isRejected(promise, /error message matcher/, "optional message")
assert.becomes(promise, "foo", "optional message")
assert.doesNotBecome(promise, "foo", "optional message")
````

### chai-spies

[chaijs.com/plugins/chai-spies](http://chaijs.com/plugins/chai-spies)

* Conflicts with chai-sinon, considering a prefix.
* The names are very generic, extra reason to prefix (min.max etc belong to a number type of is min/max).

````js
assert.spy(spy)
	expect(spy).to.be.spy;
assert.called(spy)
	expect(spy).to.have.been.called;
assert.not_called(spy)
	expect(spy).to.have.been.not_called;

assert.once(spy)
	expect(spy).to.have.been.called.once;
assert.twice(spy)
	expect(spy).to.have.been.called.twice;
assert.exactly(spy, n)
	expect(spy).to.have.been.called.exactly(3)
assert.min(spy, n)
	expect(spy).to.have.been.called.min(3)
assert.max(spy, n)
	expect(spy).to.have.been.called.max(3)
````

### chai-sinon

[chaijs.com/plugins/chai-sinon](http://chaijs.com/plugins/chai-sinon)

* Conflicts with chai-spies
* Considering a prefix

````js
assert.called(spy)
	expect(spy).to.have.been.called

assert.calledOnce(spy)
	expect(spy).to.have.been.calledOnce
assert.calledTwice(spy)
	expect(spy).to.have.been.calledTwice
assert.calledThrice(spy)
	expect(spy).to.have.been.calledThrice

assert.calledBefore(spy, spy2)
	expect(spy1).to.have.been.calledBefore(spy2)
assert.calledAfter(spy, spy2)
	expect(spy1).to.have.been.calledAfter(spy2)

assert.calledWithNew(spy)
	expect(spy).to.have.been.calledWithNew
assert.alwaysCalledWithNew(spy)
	expect(spy).to.always.have.been.calledWithNew

assert.calledOn(spy, context)
	expect(spy).to.have.been.calledOn(context)
assert.alwaysCalledOn(spy, context)
	expect(spy).to.always.have.been.calledOn(context)

//this with-set should have args as array (nor splats)
// or else we won;t be able to append the optional message argument
assert.calledWith(spy, args)
	expect(spy).to.have.been.calledWith(...args)
assert.alwaysCalledWith(spy, args)
	expect(spy).to.always.have.been.calledWith(...args)

assert.calledWithExactly(spy, args)
	expect(spy).to.always.have.been.calledWithExactly(...args)
assert.alwaysCalledWithExactly(spy, args)
	expect(spy).to.always.have.been.calledWithExactly(...args)

assert.calledWithMatch(spy, args)
	expect(spy).to.have.been.calledWithMatch(...args)
assert.alwaysCalledWithMatch(spy, args)
	expect(spy).to.always.have.been.calledWithMatch(...args)

assert.returned(spy, returnVal)
	expect(spy).to.have.returned(returnVal)
assert.alwaysReturned(spy, returnVal)
	expect(spy).to.have.always.returned(returnVal)

assert.threw(spy, errorObjOrErrorTypeStringOrNothing)
	expect(spy).to.have.thrown(errorObjOrErrorTypeStringOrNothing)
assert.alwaysThrew(spy, errorObjOrErrorTypeStringOrNothing)
	expect(spy).to.have.always.thrown(errorObjOrErrorTypeStringOrNothing)
````

### chai-changes

[chaijs.com/plugins/chai-changes](http://chaijs.com/plugins/chai-changes)

> Would be more attractive to use if the JavaScript API was easier to understand and docs would not require CoffeeScript knowledge to decode.

* Should have the change prefix I guess.

````coffee
assert.change(result, when)
	expect(-> result).to.change.when -> result -= 1
	expect(-> result).not.to.change.when -> result = result * 1
assert.changeBy(result, delta, when)
	expect(-> result).to.change.by(-2).when -> result -= 2
	expect(-> result).not.to.change.by(-3).when -> result += 1

assert.changeFrom(result, startValue, when)
	expect(-> result).to.change.from(['a', 'b']).when -> result.push('c')
assert.changeTo(result, endValue, when)
	expect(-> result).to.change.to(['a', 'b', 'c']).when -> result.push('c')
assert.changeFromTo(result, startValue, endValue, when)
	expect(-> result).to.change.from(['a', 'b']).to(['a', 'b', 'c']).when -> result.push('c')

assert.increase(result, amount, when)
	expect(-> result).to.increase.when -> result += 1

assert.decrease(result, amount, when)
	expect(-> result).to.decrease.when -> result -= 1

assert.changeAtLeast(result, amount, when)
	expect(-> result).to.change.by.atLeast(4).when -> result += 5

assert.changeAtMost(result, amount, when)
	expect(-> result).to.change.by.atMost(7).when -> result += 5
````

### chai-backbone

[chaijs.com/plugins/chai-backbone](http://chaijs.com/plugins/chai-backbone)

> Would be more attractive to use if the JavaScript API was easier to understand and docs would not require CoffeeScript knowledge to decode.

* I need to pick up my coffee skills to make sense of this.

````coffee
assert.trigger(model, trigger, models, when)
	model.should.trigger("change", with: [model]).when ->
	  model.set attribute: "value"

//not sure how to wrap this
	//this can also be chained further:
	model.should.trigger("change").and.trigger("change:attribute").when -### model.set attribute: "value"
	model.should.trigger("change").and.not.trigger("reset").when -### model.set attribute: "value"

//is this using named arguments or what?
assert.routeTo(path, router, trigger, args, when)
	"page/3".should.route.to myRouter, "openPage", arguments: ["3"]
	"pages/3".should.not.route.to myRouter, "openPage"
	"page/3".should.route.to myRouter, "openPage", considering: [conflictingRouter]

assert.callsView(view, path, when)
	view.should.call('startAuthentication').when ->
		view.$('a.login').trigger 'click'
````

## standard assertions

[chaijs.com/api/assert](http://chaijs.com/api/assert)

* Including negations and signature aliases, as extracted from `assert.d.ts` which was extracted from from chai.js v1.6.0

````js
assert.fail(actual, expected, operator?)
assert.ok(val)
//what about notOk?

assert.equal(act, exp)
assert.notEqual(act, exp)

assert.strictEqual(act, exp)
assert.notStrictEqual(act, exp)

assert.deepEqual(act, exp)
assert.notDeepEqual(act, exp)

assert.isTrue(val)
assert.isFalse(val)

assert.isNull(val)
assert.isNotNull(val)

assert.isUndefined(val)
assert.isDefined(val)

assert.isFunction(val)
assert.isNotFunction(val)

assert.isObject(val)
assert.isNotObject(val)

assert.isArray(val)
assert.isNotArray(val)

assert.isString(val)
assert.isNotString(val)

assert.isNumber(val)
assert.isNotNumber(val)

assert.isBoolean(val)
assert.isNotBoolean(val)

assert.typeOf(val, type)
assert.notTypeOf(val, type)

assert.instanceOf(val, type)
assert.notInstanceOf(val, type)

assert.include(exp, inc)
assert.notInclude(exp, inc)

assert.match(exp, re)
assert.notMatch(exp, re)

assert.property(obj, prop)
assert.notProperty(obj, prop)
assert.deepProperty(obj, prop)
assert.notDeepProperty(obj, prop)

assert.propertyVal(obj, prop, val)
assert.propertyNotVal(obj, prop, val)

assert.deepPropertyVal(obj, prop, val)
assert.deepPropertyNotVal(obj, prop, val)

assert.lengthOf(exp, len)

//throw alias fit here :)
assert.throw(fn)
assert.throw(fn, regExp)
assert.throw(fn, errType)
assert.throw(fn, errType, regExp)

assert.throws(fn)
assert.throws(fn, regExp)
assert.throws(fn, errType)
assert.throws(fn, errType, regExp)

assert.Throw(fn)
assert.Throw(fn, regExp)
assert.Throw(fn, errType)
assert.Throw(fn, errType, regExp)

assert.doesNotThrow(fn)
assert.doesNotThrow(fn, regExp)
assert.doesNotThrow(fn, errType)
assert.doesNotThrow(fn, errType, regExp)

assert.operator(val, operator, val2)
assert.closeTo(act, exp, delta)

assert.sameMembers(set1, set2)
assert.includeMembers(set1, set2)

assert.ifError(val)
````

## License

Chai.js is MIT License, and so is this repos.
