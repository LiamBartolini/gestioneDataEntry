"use strict";

var indiceNominativi = 0;
var indiceInseriti = 0;
var nominativi = [];
var inseriti = [];
var blocco;
var firstClick = false;
var nome, cognome;

jQuery(function () {
    // blocco il pulsante per evitare inserimenti sbagliati
    jQuery("#btnInserisci").prop("disabled", true);
    jQuery("#txtNome , #txtCognome").on("focus", function () {
        jQuery("#btnInserisci").removeAttr("disabled"); // quando uno dei due campi input viene focussato allora il pulsante si sblocca
    });
    // controllo se è stato premuto il pulsante
    jQuery("#btnInserisci").on("click", function() {
        nome = document.getElementById("txtNome").value;
        cognome = document.getElementById("txtCognome").value;

        if (nome.length >= 2 && cognome.length >= 2) {
            if (checkString(nome) && checkString(cognome)) {
                activeModalConferma("Confermare l'inserimento");
            } else {
                activeModalError("il nome/cognome <b>'" + nome + " " + cognome + "'</b> contiene un numero!");
            }
        } else {
            activeModalError("Lunghezza <b>'" + nome + " " + cognome + "'</b> troppo corta");
        }

        // pulisco i campi di input
        document.getElementById("txtNome").value = "";
        document.getElementById("txtCognome").value = "";

        // tolgo l'attributo disabled per la visualizzazione della list group
        jQuery("#btnListGroup").removeAttr("disabled");
    });
    
    jQuery("#btnAccetta").on("click", function () { 
        // se accetta inserisco il nominativo
        if (verifyFirstChar(nome, cognome)) {
            // se la prima è una vocale allora la aggiungo ai nominativi
            nominativi[indiceNominativi] = nome + " " + cognome;
            indiceNominativi++;
            blocco = jQuery("<p>" + nominativi[indiceNominativi - 1] + "</p>");
            blocco.addClass("inseriti");
            blocco.appendTo("#div7");
        }

        // salvo il nome e cognome come oggetto
        var daSalvare = {"nome" : nome, "cognome" : cognome};
        inseriti[indiceInseriti] = daSalvare;
        indiceInseriti++;
    });
    
    jQuery("#btnListGroup").on("click", function() {
        // controllo se è la prima volta che premo il pulsante per vedere la list gruop
        if (firstClick) {
            blocco = jQuery("<li>" + inseriti[indiceInseriti - 1].nome + " " + inseriti[indiceInseriti - 1].cognome + "</li>")
            blocco.addClass("listElement");
            blocco.appendTo("#list");    
        } else {
            for (let i = 0; i < inseriti.length; i++) {
                blocco = jQuery("<li>" + inseriti[i].nome + " " + inseriti[i].cognome + "</li>")
                blocco.addClass("listElement");
                blocco.appendTo("#list");
            }
            firstClick = true;
        }

        jQuery("#list").removeAttr("hidden");
        jQuery("#btnListGroup").prop("disabled", true);
    });
});

function verifyFirstChar(nome, cognome) {
    var vocali = ['A', 'E', 'I', 'O', 'U'];

    for (let i = 0; i < vocali.length; i++) {
        // controllo che la prima lettera sia una vocale
        if (nome[0].toUpperCase() == vocali[i] || cognome[0].toUpperCase() == vocali[i]) {
            return true;
        }
    }
    return false;
}

function activeModalConferma(testo) {
    jQuery("#testo-modal").html(testo);
    jQuery("#modal-conferma").modal("toggle");
}

function activeModalError(testo) {
    jQuery("#modal-error-text").html(testo);
    jQuery("#error-modal").modal("toggle");
}

function checkString() {
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