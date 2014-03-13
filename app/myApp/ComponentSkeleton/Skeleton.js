var SkeletonView = require('./views/SkeletonView');

module.exports = function ( parent ) {

    var $parent = parent;

    var $el;
    var $subEl;

    var _onSkeletonClick = function(){
        //Handle something here
        $subEl.height(300);
    };

    var init = function(){

        //Make HTML View
        $el = $( SkeletonView() );

        $subEl = $el.find('.skeletonclass');

        //Set som initial values
        $subEl.height(250);

        //Append element to parent wrapper
        $parent.append( $el );

        //Set up handlers
        $subEl.on('click', _onSkeletonClick);

        //Show view
        $el.show();

    };

    //init();

    return {
        init : init
    };

};