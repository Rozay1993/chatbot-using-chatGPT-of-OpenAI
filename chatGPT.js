const API_KEY = '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';
$(document).ready(function () {
	// Handler for .ready() called.
	$('#chat_input_box').keyup(function (e) {
		if (e.which == 13 && $('#chat_input_box').val() !== '') {
			const humanChat = $('#chat_input_box').val();
			$('#chat_input_box').val('');
			$('#chatbox').append(`
      <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
        <div>
          <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
            <p class="text-sm">
              ${humanChat}
            </p>
          </div>
          <span class="text-xs text-gray-500 leading-none">2 min ago</span>
        </div>
        <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
      </div>
      `);

			$('#chatbox').append(`
      <div class="flex w-full mt-2 space-x-3 max-w-xs" id="loading">
        <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
        <div>
          <span class="text-xs text-gray-500 leading-none">loading...</span>
        </div>
      </div>
      `);

			callChatGPT(humanChat);
		}
	});
});

function callChatGPT(humanChat) {
	fetch('https://api.openai.com/v1/completions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + API_KEY,
		},
		body: JSON.stringify({
			model: 'text-davinci-003',
			prompt: `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: ${humanChat}\nAI:`,
			temperature: 0.9,
			max_tokens: 150,
			top_p: 1,
			frequency_penalty: 0.0,
			presence_penalty: 0.6,
			stop: [' Human:', ' AI:'],
		}),
	})
		.then((response) => response.json())
		.then((response) => {
			const botChat = response.choices[0].text;
			$('#chatbox').append(`
      <div class="flex w-full mt-2 space-x-3 max-w-xs">
        <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
        <div>
          <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
            <p class="text-sm">
              ${botChat}
            </p>
          </div>
          <span class="text-xs text-gray-500 leading-none">2 min ago</span>
        </div>
      </div>
      `);
		})
		.finally(() => {
			$('#loading').remove();
		});
}
