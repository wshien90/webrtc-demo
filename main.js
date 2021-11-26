var socket = io('ws://localhost:3000');
function openStream() {
    const config = {audio: false, video: true };
    return navigator.mediaDevices.getUserMedia(config);
}
function playStream(idVideoTag, stream) {
    const video = document.getElementById(idVideoTag);
    video.srcObject = stream;
    video.play();
}
// openStream()
// .then(stream => playStream('localStream', stream))
const peer = new Peer({key: 'peerjs', host: '9000-bronze-pheasant-ds1pm40h.ws-us17.gitpod.io', secure: true, port: 9000});
peer.on('open', id => $('#my-peer').append(id));
//Caller
$('#btnCall').click(() => {
    const id = $('#remoteId').val();
    openStream()
    .then(stream => {
        playStream('localSream', stream);
        const call = peer.call(id, stream);
        call.on('stream', remoteStream => playStream('remoteStream', remoteStream));
    });
});
//Receiver
peer.on('call', call => {
    openStream()
    .then(stream => {
        call.answer(stream);
        playStream('localStream', stream);
        call.on('stream', remoteStream => playStream('remoteStream', remoteStream));
    });
});
//Sign up
$('#btnSignUp').click(() => {
    const username = $('#txtUsername').val();
    socket.emit('NGUOI_DUNG_DANG_KY', username);
});