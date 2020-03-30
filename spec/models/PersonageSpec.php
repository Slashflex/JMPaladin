<?php
require('./src/models/Personage.php');

describe("#getHp", function() {
    it("return 100 hp at begins", function() {
        $hero = new Personage('Jean-Michel', 100);
        expect($hero->getHp())->toBe(100);
    });
});

describe("#hurt", function() {
    it("return 88 hp after taking 12 damage", function() {
        $hero = new Personage('Jean-Michel', 100);

        $hero->hurt(12);

        expect($hero->getHp())->toBe(88);
    });
});

describe("#attack", function() {
    it("return enemy hp during the attack", function() {
        $hero = new Personage('Jean-Michel', 100);
        $vilain = new Personage('Vilain', 100);
  
        expect($hero->attack($vilain, 48)->getHp())->toBe(52);
    });
});
  
describe("#infos", function() {
    it("return 'Jean-Michel (100 hp)' for new Hero", function() {
        $hero = new Personage('Jean-Michel', 100);
  
        expect($hero->infos())->toBe("Jean-Michel (100 hp)");
    });

    it("return 'Jean-Michel is dead' after suffer damages", function() {
        $hero = new Personage('Jean-Michel', 100);
        $vilain = new Personage('Vilain', 100);

        $vilain->attack($hero, 100);
  
        expect($hero->infos())->toBe("Jean-Michel is dead");
    });
});

describe("#getName", function() {
    it("return Jean-Michel by default", function() {
        $hero = new Personage('Jean-Michel', 100);
        expect($hero->getName())->toBe('Jean-Michel');
    });
});