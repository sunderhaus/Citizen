angular.module('CitizenApp')
.factory('Map', function () {

  var map = {};

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
      default_viewbox = paper.getBBox();
  });

  var state, prev_id, state_color = {};
  map.focus = function (id) {
    if(id) {
      if(state) {
          state.attr({fill: state_color[prev_id]});
      }
      prev_id = id;
      state = paper.select('#'+id);
      var start = paper.attr('viewBox').vb,
          end = state.getBBox().vb,
          anim = '<animate id="smoothpan" attributeName="viewBox" begin="1s" dur="1s" values="'
                 + start + ';' + end + '" fill="freeze" />';
      if(!state_color[id]) {
          state_color[id] = state.attr('fill');
      }
      paper.add(Snap.parse(anim));
      state.animate({fill: '#F9B099'},1000,mina.easein);
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
  return map;
});
