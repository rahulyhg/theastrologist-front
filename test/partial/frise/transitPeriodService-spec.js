/**
 * Created by Samy on 23/10/2015.
 */
describe('Transit Period Service ...', function () {
    'use strict';
    var service, testService, mockCacheService, scope, $httpBackend;
    beforeEach(module('theastrologist.services'));
    beforeEach(function () {
        installPromiseMatchers();

        inject(function (transitPeriodService, _$httpBackend_, cacheService) {
            testService = transitPeriodService;
            $httpBackend = _$httpBackend_;
            mockCacheService = cacheService;
        });
    });

    describe('... With no cache ...', function () {
        beforeEach(function () {
        });

        it('... no argument should be rejected', function () {
            var promise = testService();
            expect(promise).toBeRejected();
        });

        describe('... When calling normally ...', function () {
            var myData = [{}, {}, {}];
            var promise;

            beforeEach(function () {
                $httpBackend.expectGET("http://rest-theastrologist.193b.starter-ca-central-1.openshiftapps.com/rest/" +
                    "1985-01-04T11:20:00+01:00/48.6456630/2.4104510/transitperiod/2013-01-01/2017-12-31").respond(myData);
                promise = testService('1985-01-04T11:20:00+01:00', '48.6456630', '2.4104510', '2013-01-01', '2017-12-31');
                $httpBackend.flush();
            });

            it('... should call service', function () {
                expect(promise).toBeResolvedWith(myData);
            });

            it('... should be persisted in cache', function () {
                expect(mockCacheService.getCachedData('1985-01-04T11:20:00+01:00/48.6456630/2.4104510/transitperiod/2013-01-01/2017-12-31')).toEqual(myData);
            });

            afterEach(function () {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });
        });

        describe("... Cas d'une erreur API ...", function () {
            var myData = [{}, {}, {}];
            var promise;

            beforeEach(function () {
                $httpBackend.expectGET("http://rest-theastrologist.193b.starter-ca-central-1.openshiftapps.com/rest/" +
                    "1985-01-04T11:20:00+01:00/48.6456630/2.4104510/transitperiod/2013-01-01/2017-12-31").respond(myData);
                promise = testService('1985-01-04T11:20:00+01:00', '48.6456630', '2.4104510', '2013-01-01', '2017-12-31');
                $httpBackend.flush();
            });

            it('... should call service', function () {
                expect(promise).toBeResolvedWith(myData);
            });

            it('... should be persisted in cache', function () {
                expect(mockCacheService.getCachedData('1985-01-04T11:20:00+01:00/48.6456630/2.4104510/transitperiod/2013-01-01/2017-12-31')).toEqual(myData);
            });

            afterEach(function () {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });
        });
    });

    describe('... When calling with the Cache ...', function () {
        var myData = [{}, {}, {}];
        beforeEach(function () {
            mockCacheService.setCachedData('a/b/c/transitperiod/d/e', myData);
        });

        it('... Second call should send the same data', function () {
            var promise = testService('a', 'b', 'c', 'd', 'e');
            expect(promise).toBeResolvedWith(myData);
        });
    });
});