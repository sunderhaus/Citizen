angular.module('CitizenApp')
.factory('Map', function () {

  var map = {},
      env;

  Snap.load('images/Blank_USA_w_territories.svg', function (data){
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
  });

  var prev_id = [], color_map = {};
  map.focus = function (id) {
    if(id) {
      var state = env.paper.select('#'+id);
      if(!color_map[id]) {
          color_map[id] = state.attr('fill');
      }
      var start = env.paper.attr('viewBox').vb,
        bbox = state.getBBox(),
        scale = .2,
        end = (bbox.x-scale/2*bbox.width) + ' ' + (bbox.y-scale/2*bbox.height) + ' '
          + (bbox.width+scale*bbox.width) + ' ' + (bbox.height+scale*bbox.height);
      if(prev_id.length) {
        var last_id = prev_id.pop(),
          last_state = env.paper.select('#'+last_id);
        if(last_id != id) {
          last_state.animate({fill: color_map[last_id]},500,mina.easeinout);
        }
      }
      state.animate({fill: '#F9B099'},500,mina.easeinout);
      env.paper.add(Snap.parse(
        '<animate attributeName="viewBox" dur="1s" values="'
          + start + ';' + end + '" fill="freeze" />'));
      prev_id.push(id);
    } else {
      if(prev_id.length) {
        var last_id = prev_id.pop(),
          last_state = env.paper.select('#'+last_id);
        if(last_id) {
          last_state.animate({fill: color_map[last_id]},500,mina.easeinout);
        }
      }
      env.paper.attr({
        viewBox: env.viewbox
      });
    }
  };
  return map;
});
