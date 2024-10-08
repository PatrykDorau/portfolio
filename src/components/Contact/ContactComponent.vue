<template>
  <div class="contact_container">
    <div class="section__title">
      <span class="number">03</span>
      <WavyTextComponent
        custom-class="content"
        text="Contact"
        bg-size="100px"
        bgPos="68%"
      />
    </div>
    <div class="contact_content">
      <div class="info">
        <div class="personal">
          <div class="column">
            <p class="title">Work with me!</p>
            <p class="text">
              <div class="p1">
                Please feel free to reach out to me to discuss my current
                status.<br />
                I may be open to new job opportunities! <br />
              </div>
              <div class="p2">
                @2024 Patryk Dorau. All rights reserved. <br />
                Last updated on 08.10.2024 18:08 UTC
              </div>
            </p>
            <a href="/public/CV.pdf" target="_blank" class="cv">
              <span class="indicator">→</span>
              <WavyTextComponent
                custom-class="content"
                text="Get my resume"
                bg-size="60px"
              />
            </a>
          </div>
        </div>
        <div class="contact">
          <div>
            <p class="title">Contact</p>
            <a href="mailto:dorau.patryk1@gmail.com" class="link"
              >dorau.patryk1@gmail.com</a
            >
            <a href="tel:+48730798773" class="link">+48 730 798 773</a>
          </div>
          <div>
            <p class="title">Links</p>
            <a
              href="https://www.facebook.com/patryk.dorau.5"
              target="_blank"
              class="link"
              >Facebook</a
            >
            <a
              class="link"
              href="https://www.linkedin.com/in/patryk-dorau-018467216/"
              target="_blank"
              >LinkedIn</a
            >
            <a
              href="https://github.com/PatrykDorau"
              target="_blank"
              class="link"
              >Github</a
            >
          </div>
        </div>
      </div>
      <div class="me">
        <div class="curved__wrapper">
          <img
            class="curved"
            src="/inkpx-curved-text.png"
            alt="Contact me text"
          />
        </div>
        <img class="photo" src="/me.jfif" alt="Me" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import WavyTextComponent from "../WavyText/WavyTextComponent.vue";
</script>
