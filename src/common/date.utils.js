export class DateUtils {
    static MillisecToFormatedDate(m = Date.now()) {
        let dateObj = new Date(m)
        let date = dateObj.getDate()
        let mouth = dateObj.getMonth() + 1
        let year = dateObj.getFullYear()
        return date + "/" + mouth + "/" + year
    }
    static old(mData) {
        var dataNasc = new Date(mData)
        var dataAtual = new Date();
        var anoAtual = dataAtual.getFullYear();
        var diaNasc = dataNasc.getDate()
        var mesNasc = dataNasc.getMonth() + 1;
        var anoNasc = dataNasc.getFullYear();
        var idade = anoAtual - anoNasc;
        var mesAtual = dataAtual.getMonth() + 1;
        if (mesAtual < mesNasc) {
            idade--;
        } else {
            if (mesAtual == mesNasc) {
                if (new Date().getDate() < diaNasc) {
                    idade--;
                }
            }
        }
        return idade;
    }
    static getDayofWeekBR(dayId) {
        switch (dayId) {
            case 0:
                return 'DOM'
            case 1:
                return 'SEG'
            case 2:
                return 'TER'
            case 3:
                return 'QUA'
            case 4:
                return 'QUI'
            case 5:
                return 'SEX'
            case 6:
                return 'SÁB'
            default:
                return 'DOM'
        }
    }
}