angular.module('CitizenApp')
.factory('Map', function () {

  var map = {},
      env;

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
  });

  var prev_id = [], color_map = {};
  map.focus = function (id) {
    if(id) {
      if(prev_id.length) {
        env.paper.select(prev_id.pop()).attr({
            fill: color_map[last_id]
        });
      }
      var state = env.paper.select('#'+id);
      if(!color_map[id]) {
          color_map[id] = state.attr('fill');
      }
      prev_id.push(id);
      var start = env.paper.attr('viewBox').vb,
        bbox = state.getBBox(),
        scale = .2,
        end = (bbox.x-scale/2*bbox.width) + ' ' + (bbox.y-scale/2*bbox.height) + ' '
          + (bbox.width+scale*bbox.width) + ' ' + (bbox.height+scale*bbox.height);
      state.animate({fill: '#F9B099'},1000,mina.easeout);
        var last_state = env.paper.select(prev_id.pop());
        last_state.animate({fill: color_map[last_id]},1000,mina.easeout);
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
