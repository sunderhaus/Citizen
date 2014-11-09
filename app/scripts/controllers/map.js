angular.module('CitizenApp').controller('MapController', function ($scope) {
  var paper, default_viewbox;
  Snap.load('/images/Blank_USA_w_territories.svg', function (data){
      paper = Snap.select("#header-background");
      paper.append(data);
      paper = paper.select('svg');
      paper.attr({
          width: '100%',
          'margin-left': 'auto',
          'margin-right': 'auto'
      });
      default_viewbox = paper.attr('viewBox');

  $scope.focus('TN');
  });

  var state, state_color;
  $scope.focus = function (id) {
    if(id) {
      if(state) {
          state.attr({
              fill: state_color
          });
      }
      state = paper.select('#'+id);
      state_color = state.attr('fill');
      state.attr({
          fill: '#F05040'
      });
      paper.attr({
          viewBox: state.getBBox()
      });
    } else {
      if(state) {
          state.attr({
              fill: state_color
          });
      }
      paper.attr({
          viewBox: default_viewbox
      });
    }
  };
});
