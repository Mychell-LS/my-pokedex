
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

// Configuração de exibição das notificações
export function setupNotificationHandler() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

// Configuração do canal Android
export async function configureAndroidChannel() {
  if (Platform.OS !== 'android') return;

  try {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Pokédex',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FFCB05',
    });
  } catch (error) {
    console.warn('Erro ao configurar notificações:', error);
  }
}

// Solicitação de permissão
export async function requestNotificationPermission() {
  try {
    const current = await Notifications.getPermissionsAsync();

    if (current.status === 'granted') {
      return true;
    }

    const asked = await Notifications.requestPermissionsAsync();
    return asked.status === 'granted';
  } catch (error) {
    console.warn('Erro ao solicitar permissão:', error);
    return false;
  }
}

// Notificação ao favoritar Pokémon
export async function notifyPokemonFavorited(pokemonName: string) {
  const granted = await requestNotificationPermission();
  if (!granted) return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Novo favorito!',
      body: `${pokemonName} foi adicionado aos favoritos.`,
      sound: true,
    },
    trigger: null,
  });
}

// Lembrete rápido
export async function scheduleQuickReminder(seconds = 10) {
  const granted = await requestNotificationPermission();
  if (!granted) return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Volte para a Pokédex',
      body: 'Tem Pokémon esperando por você!',
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds,
      repeats: false,
    },
  });
}

// Lembrete diário
export async function scheduleDailyReminder(hour = 20, minute = 0) {
  const granted = await requestNotificationPermission();
  if (!granted) return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Hora da Pokédex',
      body: 'Veja seus favoritos e descubra novos Pokémon.',
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
    },
  });
}

// Cancelar notificações
export async function cancelAllNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}
