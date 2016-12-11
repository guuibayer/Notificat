import config from '../../index';
import express from 'express';
import request from 'request';

class WebhookService {
  constructor () {};

  static tokenVerify (req, res) {
    if (req.query['hub.verify_token'] !== config.FACEBOOK_PAGE_ACCESS_TOKEN) {
      return res.send('Error, wrong token');
    }

    return res.send(req.query['hub.challenge']);
  }

  static messageEvent (req, res) {
    let messagingEvents = req.body.entry[0].messaging;

    console.log(req.body)

    messagingEvents.map(messagingEvent => {
      let message = messagingEvent.message.text;
      let sender = messagingEvent.sender.id;

      WebhookService.textMessage(sender, message.substring(0, 200));
    })

    res.sendStatus(200);
  }

  static textMessage (sender, message) {
    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: { access_token: config.FACEBOOK_PAGE_ACCESS_TOKEN },
      method: 'POST',
      json: {
        recipient: { id: sender },
        message: { text: message },
      }
    }, (error, response, body) => {
      if (error) {
        console.log('Error sending messages: ', error)
        return;
      }
      if (response.body.error) {
        console.log('Error: ', response.body.error)
        return;
      }
    })
  }
}

export default WebhookService;