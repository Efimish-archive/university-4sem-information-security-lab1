import { generateKeyString, encode, decode } from "./utils";

const text_to_encode = document.getElementById('text-to-encode') as HTMLInputElement;
const encode_button = document.getElementById('encode-button') as HTMLButtonElement;
const encoded_text = document.getElementById('encoded-text') as HTMLInputElement;
const encoding_key = document.getElementById('encoding-key') as HTMLInputElement;
const generate_encoding_key = document.getElementById('generate-encoding-key') as HTMLButtonElement;

const text_to_decode = document.getElementById('text-to-decode') as HTMLInputElement;
const decode_button = document.getElementById('decode-button') as HTMLButtonElement;
const decoded_text = document.getElementById('decoded-text') as HTMLInputElement;
const decoding_key = document.getElementById('decoding-key') as HTMLInputElement;
const generate_decoding_key = document.getElementById('generate-decoding-key') as HTMLButtonElement;

encode_button.onclick = () => {
    try {
        encoded_text.value = encode(text_to_encode.value, encoding_key.value);
    } catch (e: any) {
        alert(e.message);
    }
}
generate_encoding_key.onclick = () => {
    encoding_key.value = generateKeyString(text_to_encode.value.length);
}

decode_button.onclick = () => {
    try {
        decoded_text.value = decode(text_to_decode.value, decoding_key.value);
    } catch (e: any) {
        alert(e.message);
    }
}
generate_decoding_key.onclick = () => {
    decoding_key.value = generateKeyString(text_to_decode.value.length);
}
