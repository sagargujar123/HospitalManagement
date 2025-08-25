export class StatusStyleUtil {
  static getStatusClass(status: string): string {
    if (!status) return 'text-gray-600';

    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-green-600 font-semibold';
      case 'scheduled':
        return 'text-amber-600 font-semibold';
      case 'cancelled':
        return 'text-red-600 font-semibold';
      case 'pending':
        return 'text-blue-700 font-semibold';
      default:
        return 'text-gray-600';
    }
  }
}
