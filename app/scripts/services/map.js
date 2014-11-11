angular.module('CitizenApp')
.factory('Map', function () {

  var map = {},
      env;

// use "strict";

  map.load = function(userLocation) {
    Snap.load('/images/Blank_USA_w_territories.svg', function (data){
      var paper = Snap.select(".USAmap");
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

  var prev_color = [];
  map.focus = function (id, paper, default_viewbox) {
    if(id) {
      if(prev_color.length) {
        var info = prev_color.pop();
        env.paper.select('#'+info.id).attr({
            fill: info.color});
      }
      var state = env.paper.select('#'+id);
      prev_color.push({id:id,color: state.attr('fill')});
      var start = env.paper.attr('viewBox').vb,
        bbox = state.getBBox(),
        scale = .2,
        end = (bbox.x-scale/2*bbox.width) + ' ' + (bbox.y-scale/2*bbox.height) + ' '
          + (bbox.width+scale*bbox.width) + ' ' + (bbox.height+scale*bbox.height);
      console.log(end, state.getBBox());
      state.animate({fill: '#F9B099'},1000,mina.easein);
      env.paper.add(Snap.parse(
        '<animate id="smoothpan" attributeName="viewBox" dur="4s" values="'
          + start + ';' + end + '" fill="freeze" />'));
    } else {
      if(prev_color.length) {
        var info = prev_color.pop();
        env.paper.select('#'+info.id).attr({
            fill: info.color});
      }
      env.paper.attr({
        viewBox: env.viewbox
      });
    }
  };
  return map;
});
