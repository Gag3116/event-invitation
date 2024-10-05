<template>
    <div>
      <h2>Responses</h2>
      <ul v-if="invitations">
        <li v-for="invitation in invitations" :key="invitation._id">
          {{ invitation.weddingName }} - {{ totalGuests(invitation.rsvp) }} guests
          <ul>
            <li v-for="rsvp in invitation.rsvp" :key="rsvp._id">{{ rsvp.name }} - {{ rsvp.guests }} guests</li>
          </ul>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        invitations: null
      };
    },
    async created() {
      try {
        const response = await axios.get('http://localhost:5001/api/invitations');
        this.invitations = response.data;
      } catch (error) {
        console.error('Error fetching invitations:', error);
      }
    },
    methods: {
      totalGuests(rsvpList) {
        return rsvpList.reduce((total, rsvp) => total + rsvp.guests, 0);
      }
    },
    name:'ResponsesPage'
  };
  </script>
  