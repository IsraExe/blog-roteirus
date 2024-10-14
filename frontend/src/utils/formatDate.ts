import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    const formattedDate = format(date, 'd \'de\' MMMM \'de\' yyyy', { locale: ptBR });

    return formattedDate.replace(/de (.)/g, (match, p1) => `de ${p1.toUpperCase()}`);
};

export { formatDate };
