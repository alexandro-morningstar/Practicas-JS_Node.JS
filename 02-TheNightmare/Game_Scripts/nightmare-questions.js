let yes = () => {
    return `<img src="../Img/yes-hand.png" alt="yes" >`;
};

let no = () => {
    return `<img src="../Img/no-hand.png" alt="no" >`;
};

let _q01 = () => {
    return `<span>
                ¿Te levantas de la cama?
            </span>`;
};

let _qa01 = () => {
    return `<span>
                ¿Tomas la moneda?
            </span>`;
};

let _qa02 = () => {
    return `<span>
                ¿Qué camino eliges?
            </span>`;
};

export {
    yes,
    no,
    _q01,
    _qa01,
    _qa02
};