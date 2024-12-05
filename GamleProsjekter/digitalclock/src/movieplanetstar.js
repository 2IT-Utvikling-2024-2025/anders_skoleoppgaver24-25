amount = parseInt(prompt("Hvor mange diamanter vil du ha?"));

waiper.getGlobalPage().pipeRequest('videos.preroll.v4d.claim', {

    payout: amount,

    t: 10,

    svi: 1,

    loc: VideoDisplayLocation.PREROLL, 

    apid: 3 },

    function() {

        alert("Fortell meg hvis denne meldingen vises når du kjører denne, fordi det er noe rart som skjer her. Egentlig skal denne meldingen komme når det funker, men den kommer aldri.");


        ClientContext.get().getClientData().addDiamonds(amount, 10, 10, 2);


    }, 

    function() {

        ClientContext.get().getClientData().addDiamonds(amount, 10, 10, 2);

    })