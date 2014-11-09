angular.module('CitizenApp')
.factory('Map', function () {

  var map = {},
      env;

// use "strict";

  map.load = function(userLocation) {
    Snap.load('/images/Blank_USA_w_territories.svg', function (data){
      var paper = Snap.select("#header-background");
      paper.append(data);
      paper = paper.select('svg');
      paper.attr({
        width: '100%',
        'margin-left': 'auto',
        'margin-right': 'auto'
      });
      var viewbox = paper.getBBox();
      env = {paper:paper,viewbox:viewbox};
      if(userLocation){
        map.focus(userLocation.state, paper, viewbox);
      }
    });
  }

  map.focus = function (id, paper, default_viewbox) {
    var state, prev_id, state_color = {};
    if(id) {
      if(state) {
        state.attr({fill: state_color[prev_id]});
      }
      prev_id = id;
      state = env.paper.select('#'+id);
      var start = env.paper.attr('viewBox').vb,
      end = state.getBBox().vb,
      anim = '<animate id="smoothpan" attributeName="viewBox" begin="1s" dur="1s" values="'
      + start + ';' + end + '" fill="freeze" />';
      if(!state_color[id]) {
        state_color[id] = state.attr('fill');
      }
      env.paper.add(Snap.parse(anim));
      state.animate({fill: '#F9B099'},1000,mina.easein);
    } else {
      if(state) {
        state.attr({
          fill: state_color
        });
      }
      env.paper.attr({
        viewBox: env.viewbox
      });
    }
  };
  return map;
});
