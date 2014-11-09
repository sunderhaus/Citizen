angular.module('infiniteScroll', [])
    .directive('infiniteScroll', [ "$window", function ($window) {
        return {
            link:function (scope, element, attrs) {
                var offset = parseInt(attrs.threshold) || 0;
                var e = element[0];

                element.bind('scroll', function () {
                    // console.log('scrolling?');
                    if (scope.$eval(attrs.canLoad) && e.scrollTop + e.offsetHeight >= e.scrollHeight - offset) {
                        scope.$apply(attrs.infiniteScroll);
                    }
                });
                angular.element($window).bind("scroll", function() {
                    // console.log('scrolly');
                    // console.log(scope.$eval(attrs.canLoad));
                    // console.log(attrs.canLoad, e.scrollTop + e.offsetHeight, e.scrollHeight - offset);
                    if (scope.$eval(attrs.canLoad) && e.scrollTop + e.offsetHeight >= e.scrollHeight - offset) {
                        // console.log('inside??');
                        scope.$apply(attrs.infiniteScroll);
                    }
                });
            }
        };
    }]);