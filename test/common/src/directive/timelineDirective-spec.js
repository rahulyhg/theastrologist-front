/**
 * Created by Samy on 10/11/2015.
 */
describe('Timeline directive...', function () {
    'use strict';
    var mockService, $scope, $httpBackend, $compile;
    beforeEach(module('theastrologist.services'));
    beforeEach(module('theastrologist.directives'));
    beforeEach(function () {
        installPromiseMatchers();

        inject(function (transitPeriodService, _$compile_, _$rootScope_) {
            mockService = transitPeriodService;
            $compile = _$compile_;
            $scope = _$rootScope_.$new();
        });

        $scope.data = {
            housePeriods: {
                bidule: [
                    {
                        "natalHouse": "II",
                        "beforeTransitionStartDate": "-",
                        "startDate": "2012-01-01",
                        "endDate": "2013-10-20",
                        "afterTransitionEndDate": "2013-10-20"
                    },
                    {
                        "natalHouse": "III",
                        "beforeTransitionStartDate": "2013-10-20",
                        "startDate": "2013-10-20",
                        "endDate": "2016-01-10",
                        "afterTransitionEndDate": "2016-10-02"
                    }
                ],
                jojo: [
                    {
                        "natalHouse": "VII",
                        "beforeTransitionStartDate": "-",
                        "startDate": "2012-01-01",
                        "endDate": "2013-06-02",
                        "afterTransitionEndDate": "2014-03-23"
                    },
                    {
                        "natalHouse": "VIII",
                        "beforeTransitionStartDate": "2013-06-02",
                        "startDate": "2014-03-23",
                        "endDate": "2016-12-25",
                        "afterTransitionEndDate": "-"
                    }
                ]
            },
            planetPeriods: {
                bidule: [
                    {
                        "natalPlanet": "MILIEU_DU_CIEL",
                        "aspect": "CARRE",
                        "startDate": "2010-01-01",
                        "endDate": "2010-02-12"
                    },
                    {
                        "natalPlanet": "NOEUD_NORD_MOYEN",
                        "aspect": "SEXTILE",
                        "startDate": "2010-01-29",
                        "endDate": "2010-03-05"
                    }
                ],
                jojo: [
                    {
                        "natalPlanet": "MERCURE",
                        "aspect": "CARRE",
                        "startDate": "2010-01-01",
                        "endDate": "2010-01-29"
                    },
                    {
                        "natalPlanet": "SATURNE",
                        "aspect": "TRIGONE",
                        "startDate": "2010-01-01",
                        "endDate": "2010-04-09"
                    }
                ]
            }
        };
    });

    it('... deja le truc de base', function () {

        var element = $compile("<timeline planet='jojo' data='data'/>")($scope);
        // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
        $scope.$digest();
        // Check that the compiled element contains the templated content
        var actual = element.html();
        expect(actual).toContain('<div class="vis-timeline');
        // TODO : à refaire fonctionner, mais à tester en live d'abord
        // expect(actual).toContain('CARRE MERCURE');
    });
});
