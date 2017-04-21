/**
 * Created by Samy on 10/11/2015.
 */
describe('Filter...', function () {
    'use strict';
    var $scope, $filter;
    beforeEach(module('theastrologist.filters'));

    beforeEach(function () {
        installPromiseMatchers();

        inject(function (_$filter_) {
            $filter = _$filter_;
        });
    });


    it('... isoDate', function () {
        var date = new Date();
        var filtered = $filter('isoDate')(date);
        expect(filtered.length).toEqual(10);
    });

    it('... isoDateTime', function () {
        var date = new Date();
        var filtered = $filter('isoDateTime')(date);
        expect(filtered.length).toEqual(20);
    });

    it('... isoDateTime 2 arg', function () {
        var filtered = $filter('isoDateTime')("2017-03-20", "00:01");
        expect(filtered).toEqual("2017-03-20T00:01");
    });

    it('... isoDateTime 2 arg date', function () {
        var filtered = $filter('isoDateTime')(new Date(), new Date());
        expect(filtered.length).toEqual(16);
    });

    it('... isoTime', function () {
        var date = new Date();
        var filtered = $filter('isoTime')(date);
        expect(filtered.length).toEqual(5);
    });
});
