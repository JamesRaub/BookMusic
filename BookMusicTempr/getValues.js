/**
 * Created by tal on 8/28/16.
 */

module.exports = function(obj) {
    anger = obj.anger;
    disgust = obj.disgust;
    fear = obj.fear;
    joy = obj.joy;
    sadness = obj.sadness;

    result = {
        "valence": null, "acousticness": null, "energy": null, "loudness": null, "mode": null, "tempo": null, "timeSignature": null
    };

    anger = scale(anger);
    disgust = scale(disgust);
    fear = scale(fear);
    joy = 2 * scale(joy);
    sadness = scale(sadness);

    result.valence = joy - anger;
    result.energy = anger + disgust + fear + joy + sadness;
    result.loudness = fear + anger - disgust - sadness;
    result.mode = (joy > sadness) ? 1 : 0;
    result.timeSignature = 4;

    return result;
};

function scale(input) {
    return 2 * (input - 0.5);
}
