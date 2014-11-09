angular.module("CitizenApp")
  .directive("scrollTo", ["$window", function($window){
    return {
      restrict : "AC",
      compile : function(){

        var document = $window.document;
        
        //find element with the give id of name and scroll to the first element it finds
        function scrollInto(idOrName) {
          if(!idOrName)
            $window.scrollTo(0,0);
          //check if an element can be found with id attribute
          var el = document.getElementById(idOrName);
          
          //check if an element can be found with name attribute if there is no such id
          if(!el) {
            el = document.getElementsByName(idOrName);

            if(el && el.length)
              el = el[0];
            else
              el = null;
          }//end if()
          
          //if an element is found, scroll to the element
          if(el) 
            el.scrollIntoView(false);
          //otherwise, ignore
        }

        return function(scope, element, attr) {
          element.bind("click", function(event){
            scrollInto(attr.scrollTo);
          });
        };
      }
    };
}]);

