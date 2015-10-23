/**
 * Created by Samy on 23/10/2015.
 */
describe('Test services', function () {
    'use strict';
    var service;
    beforeEach(module('theastrologist'));
    beforeEach(module(inject(function (version) {
        service = version();
    })));
    describe('Version service', function () {
        it('should have correct version', function () {
            expect(service).toEqual('1.1.0');
        });
    });
});