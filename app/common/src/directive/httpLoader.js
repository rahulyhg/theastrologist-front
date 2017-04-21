/**
 * Created by Samy on 30/01/2016.
 */
angular.module('theastrologist.directives').directive('httpLoader', function () {
    return {
        restrict: 'EA',
        template: '<md-progress-linear md-mode="query"></md-progress-linear>',
        link: function (scope, element) {
            // Store original display mode of element
            var shownType = element.css('display');

            function hideElement() {
                element.css('display', 'none');
            }

            scope.$on('httpLoaderStart', function () {
                element.css('display', shownType);
            });

            scope.$on('httpLoaderEnd', hideElement);

            // Initially hidden
            hideElement();
        }
    };
});
