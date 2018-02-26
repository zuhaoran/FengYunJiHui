/**
 * Created by chu on 2017/8/16 0016.
 */
var Socket = require("socket.io");
const SocketServer = function (server) {
    var that = Socket(server);
    that.on("connection", function (socket) {
        console.log("a user connection");
    });
    return that;
};
module.exports = SocketServer;