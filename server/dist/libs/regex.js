"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordRegex = exports.usernameRegex = exports.slugRegex = exports.nameRegex = exports.urlRegex = void 0;
exports.urlRegex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;
exports.nameRegex = /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\d\.\-\\s]+$/i;
exports.slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
exports.usernameRegex = /^[a-z0-9_-]{6,32}$/;
exports.passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/;
//# sourceMappingURL=regex.js.map