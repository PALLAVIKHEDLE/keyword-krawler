 async function scraperText(payload) {
    let final_response
    try {
      const response =  await fetch('https://app.group5.live/api/v1/scraping/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      .then((response) => {
        if (response.status==200) {
          return response.json();
        }else {
          throw new Error("Failed to load page, status:"+response.status);
        }
      })
      .then(data => {
        console.log('API response:', data);
        final_response = data
        return data
      })
      return final_response;
    } catch (error) {
      alert("That's probably not a valid url, by the way we hate querystrings :)", error);
      window.location.reload();
      return [];
    }
  }
  export default scraperText;