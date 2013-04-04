$E = {
  initialize: function(args) {
    args = args || {}
    args['textarea'] = args['textarea'] || 'text-input'
    $E.textarea = $('#'+args['textarea'])
  },
  is_editing: function() {
    return ($E.textarea[0].selectionStart == 0 && $E.textarea[0].selectionEnd == 0)
  },
  // wraps currently selected text in textarea with strings a and b
  wrap: function(a,b,args) {
    var len = $E.textarea.val().length;
    var start = $E.textarea[0].selectionStart;
    var end = $E.textarea[0].selectionEnd;
    var sel = $E.textarea.val().substring(start, end);
    if (args && args['fallback']) { // an alternative if nothing has been selected, but we're simply dealing with an insertion point
      sel = args['fallback']
    }
    var replace = a + sel + b;
    if (args && args['newline']) {
      if ($E.textarea[0].selectionStart > 0) replace = "\n\n"+replace
      replace = replace+"\n\n"
    }
    $E.textarea.val($E.textarea.val().substring(0,start) + replace + $E.textarea.val().substring(end,len));
  },
  bold: function() {
    $E.wrap('**','**')
  },
  italic: function() {
    $E.wrap('__','__')
  },
  link: function(uri) {
    uri = uri || prompt('Enter a URL')
    $E.wrap('[',']('+uri+')')
  },
  image: function(src) {
    src = src || prompt('Enter an image URL')
    $E.wrap('\n![',']('+src+')\n')
  },

  h1: function() {
    $E.wrap('#','')
  },
  h2: function() {
    $E.wrap('##','')
  },
  h3: function() {
    $E.wrap('###','')
  },
  h4: function() {
    $E.wrap('####','')
  },
  h5: function() {
    $E.wrap('#####','')
  },
  h6: function() {
    $E.wrap('######','')
  },
  h7: function() {
    $E.wrap('#######','')
  },
  apply_template: function(template) {
    $E.textarea.val($E.textarea.val()+'\n\n'+$E.templates[template])
  },
  templates: {
    default: "##What I want to do\n\n##My attempt and results\n\n##Questions and next steps",
    support: "##Details about the problem\n\n",
    event: "##Event details\n\nWhen, where, what\n\n##Background\n\nWho, why"
  }
}
