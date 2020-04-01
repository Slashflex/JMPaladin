<?php

declare(strict_types=1);

class Fight
{
  private $hero;
  private $vilain;

  function __construct(Character $hero, Character $vilain)
  {
    $this->hero = $hero;
    $this->vilain = $vilain;
  }

  public function isOver(): bool
  {
    return $this->hero->isDead() || $this->vilain->isDead();
  }
}
