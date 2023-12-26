import { step } from '../allure.helper';

const config = require('../../../config/config.data.json').env;
const imaps = require('imap-simple');
const imapUser = config.IMAP.USER;
const imapPassword = config.IMAP.PASSWORD;
const imapHost = config.IMAP.HOST;

export class EmailHelper {
  @step('[API] Wait for delete all emails')
  static async deleteAllEmails(): Promise<any> {
    const config = {
      imap: {
        user: imapUser,
        password: imapPassword,
        host: imapHost,
        port: 993,
        markSeen: true,
        authTimeout: 10000,
        tls: true,
        tlsOptions: { servername: imapHost },
      },
    };
    imaps.connect(config).then(async function(connection: { openBox: (arg0: string) => Promise<any>; search: (arg0: string[], arg1: { bodies: string[]; markSeen: boolean; }) => Promise<any>; addFlags: (arg0: any, arg1: string) => void; closeBox: () => void; end: () => void; }) {
      return connection.openBox('INBOX').then(async function() {

        const fetchOptions = {
          bodies: ['TEXT'],
          markSeen: false,
        };

        const searchCriteria = ['ALL'];
        return connection.search(searchCriteria, fetchOptions).then(async function(messages) {
          if (messages.length >= 1) {
            messages.forEach((message: { attributes: { uid: any; }; }) => {
              connection.addFlags(message.attributes.uid, "\Deleted");
            });
          }
          connection.closeBox();
          connection.end();
        });
      });
    });
  }

  @step('[API] Get the "Code" value from email')
  static async getEmailCode(user: any, type: string): Promise<string> {
    let code = '';
    let subject = '';
    let sep = '';
    let sep2 = '';
    const config = {
      imap: {
        user: imapUser,
        password: imapPassword,
        host: imapHost,
        port: 993,
        markSeen: true,
        authTimeout: 10000,
        tls: true,
        tlsOptions: { servername: imapHost },
      },
    };
    const fetchOptions = {
      bodies: ['TEXT'],
      markSeen: false,
      unseen: true,
      recent: true
    };
    switch (type) {
      case 'signup': {
        subject = 'Welcome  to Ultra! Confirm Your Email';
        sep = 'your email:';
        sep2 = 'If';
        break;
      }
      case 'login': {
        subject = 'Ultra: Account authentication check';
        sep = 'your identity:';
        sep2 = 'If';
        break;
      }
      case 'reset your password': {
        subject = 'Ultra: Resetting your password';
        sep = 'verification code!';
        sep2 = 'This code';
        break;
      }
    }
    const searchCriteria = [
      'ALL',
      ['TO', await user.email],
      ['SUBJECT', subject],
    ];
    for (let i = 0; i < 20; i++) {
      if (code !== '') {
        break;
      }
      await imaps
        .connect(config)
        .then(
          async (connection: {
            openBox: (arg0: string) => Promise<any>;
            search: (
              arg0: (string | string[])[],
              arg1: { bodies: string[]; markSeen: boolean },
            ) => Promise<any>;
            end: (arg0: string)  => Promise<any>;
          }) => {
            return await connection.openBox('INBOX').then(async () => {
              return await connection
                .search(searchCriteria, fetchOptions)
                .then(async results => {
                  if (results.length >= 1) {
                    const temp = await results[results.length - 1].parts[0].body;
                    code = temp
                      .split(sep)[1]
                      .split(sep2)[0]
                      .trim();
                  }
                  return await connection.end(code);
                });
            });
          },
        )
        .catch((error: any) => {
          console.log('ERROR: ', error);
        });
    }
    if (code === '') {
      throw new Error('Cannot get email confirmation code from gmail');
    }
    return code;
  }

  @step('[API] Get the "Email" info')
  static async getEmailInfo(user: any): Promise<string> {
    let info = '';
    let subject = 'Thank you for your Ultra purchase';
    const config = {
      imap: {
        user: imapUser,
        password: imapPassword,
        host: imapHost,
        port: 993,
        markSeen: true,
        authTimeout: 10000,
        tls: true,
        tlsOptions: { servername: imapHost },
      },
    };
    const fetchOptions = {
      bodies: ['TEXT'],
      markSeen: false,
    };

    const searchCriteria = [
      'ALL',
      ['TO', await user.email],
      ['SUBJECT', subject],
    ];

    for (let i = 0; i < 20; i++) {
      if (info !== '') {
        break;
      }
      await imaps
        .connect(config)
        .then(
          async (connection: {
            openBox: (arg0: string) => Promise<any>;
            search: (
              arg0: (string | string[])[],
              arg1: { bodies: string[]; markSeen: boolean },
            ) => Promise<any>;
            end: (arg0: string)  => Promise<any>;
          }) => {
            return await connection.openBox('INBOX').then(async () => {
              return await connection
                .search(searchCriteria, fetchOptions)
                .then(async results => {
                  if (results.length >= 1) {
                    const temp = await results[results.length - 1].parts[0].body;
                    info = temp
                      .trim();
                  }
                  return await connection.end(info);
                });
            });
          },
        )
        .catch((error: any) => {
          console.log('ERROR: ', error);
        });
    }
    if (info === '') {
      throw new Error('Cannot get email confirmation code from gmail');
    }
    return info;
  }
}
