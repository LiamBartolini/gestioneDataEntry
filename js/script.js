"use strict";

var indice = 0;
var isValid;
var vale = false;
var nominativi = [];
var inseriti = [];
var blocco;

jQuery(function () {
    jQuery("#btnInserisci").on("click", function() {
        const nome = document.getElementById("txtNome").value;
        const cognome = document.getElementById("txtCognome").value;
        verify(nome, cognome);

        // pulisco i campi di input
        document.getElementById("txtNome").value = "";
        document.getElementById("txtCognome").value = "";

        // tolgo l'attributo disabled per la visualizzazione della list group
        jQuery("#btnListGroup").removeAttr("disabled");

        if (nominativi.length > 0) {
            blocco = jQuery("<p>" + nominativi[nominativi.length - 1] + "</p>");
            blocco.addClass("inseriti");
            blocco.appendTo("#div7");
        }
    });
    
    jQuery("#btnListGroup").on("click", function() {
        if (inseriti.length != 0) {
            blocco = jQuery("<li>" + inseriti[indice - 1].nome + " " + inseriti[indice - 1].cognome + "</li>")
            blocco.addClass("listElement");
            blocco.appendTo("#list");
        }
        jQuery("#list").removeAttr("hidden");
        jQuery("#btnListGroup").prop("disabled", true);
    });
});


function verify(nome, cognome) {
    var vocali = ['A', 'E', 'I', 'O', 'U'];

    // controllo se la lunghezza è maggiore di 2
    if (nome.length >= 2 && cognome.length >= 2) {
        // controllo se entrambi i nomi sono validi
        if (checkValue(nome) && checkValue(cognome)) {
            for (let i = 0; i < vocali.length; i++) {
                // controllo che la prima lettera sia una vocale
                if (nome[0].toUpperCase() == vocali[i] || cognome[0].toUpperCase() == vocali[i]) {
                    vale = true;
                    break;
                } else {
                    vale = false;
                }
            }
            // se la prima è una vocale allora la aggiungo ai nominativi
            if (vale) {
                nominativi[indice] = nome + " " + cognome;
            }
            // creo un oggetto e lo inserisco dentro l'array di oggetti
            var daSalvare = {"nome" : nome, "cognome" : cognome};
            inseriti[indice] = daSalvare;
            indice++;
        } else {
            activeModalError("il nome <b>'" + arguments[0] + "'</b> contiene un numero!");
        }
    } else {
        // in caso apro un modale che dice del nome troppo corto
        activeModalError("Lunghezza <b>'" + nome + " " + cognome + "'</b> troppo corta");
    }
}

function activeModalError(testo) {
    jQuery("#modal-error-text").html(testo);
    jQuery("#error-modal").modal("toggle");
}

function checkValue() {
    // controlla se tutto il nome/cognome siano senza numeri o caratteri particolari
    for (let i = 0; i < arguments[0].length; i++) {
        let valore = arguments[0].charCodeAt(i);
        if (valore >= 65 && valore <= 122) {
            continue;
        } else {
            return false;
        }
    }
    return true;
}