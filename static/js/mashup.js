$(function () {
    console.log("ready!");
    myParaxify = paraxify('.paraxify');
    if (!Modernizr.touch) {
        myParaxify = paraxify('.paraxify');
    }
});