document.getElementById('voteButton').addEventListener('click', function() {
  const selectedCandidate = document.querySelector('input[name="candidate"]:checked');
  
  if (selectedCandidate) {
    const candidateName = selectedCandidate.value;
    const max = 100;
    const randomNumber = Math.floor(Math.random() * max);
    const voteid = randomNumber.toString();
    console.log(randomNumber);
    const voteData = {
      voteId: voteid,
      voteOption: candidateName
    };
    
    // Realizar la solicitud HTTP POST a la API Gateway
    fetch('https://ufrsgf32v2.execute-api.us-east-1.amazonaws.com/dev/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(voteData)
    })
    .then(response => response.json())
    .then(data => {
      // Manejar la respuesta de la API Gateway
      console.log(data);
      alert('¡Voto exitoso!');
    })
    .catch(error => {
      // Manejar errores
      console.error('Error:', error);
      alert('Error al enviar el voto. Por favor, intenta nuevamente.');
    });
  } else {
    alert('Selecciona un candidato antes de votar.');
  }
});
