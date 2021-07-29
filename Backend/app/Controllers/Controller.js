import * as Exceptions from '../Exceptions/exceptions';
import Joi from '@hapi/joi';
import at from 'v-at';
import Logger from '../Helpers/Logger';


export default class Contoller {
    constructor(response) {
        this.response = response;
    }
    sendResponse(data) {
        this.response.status(200).json({ data });
    }

    

    handleException(error) {
        switch (error.name) {
          case 'GeneralException':
            this.response.status(501).json({ error: error.message });
            // Logger.error(new Error(error));
            break;
          case 'UnauthorizedException':
            // Logger.error('UnauthorizedException: %s', error.message);
            this.response.status(401).json({ error: error.message });
            break;
          case 'NotFoundException':
            // Logger.error('NotFoundException: %s', error.message);
            this.response.status(404).json({ error: error.message });
            break;
          case 'ConflictException':
            // Logger.error('ConflictException: %s', error.message);
            this.response.status(409).json({ error: error.message });
            break;
          case 'ValidationException':
            // Logger.error('ValidationException: %s', error.message);
            this.response.status(422).json({ error: error.message });
            break;
          case 'ForbiddenException':
            // Logger.error('ForbiddenException: %s', error.message);
            this.response.status(403).json({ error: error.message });
            break;
          case 'InternalServerErrorException':
            // Logger.error('InternalServerErrorException: %s', error.message);
            this.response.status(500).json({ error: error.message });
            break;
          case 'GraphQLError':
            // Logger.error(error.message);
            this.response.status(400).json({ error: error.message });
            break;
          case 'InternalServerErrorException':
            // Logger.error(error.message);
            this.response.status(500).json({ error: error.message });
            break;
          case 'PermissionDeniedException':
            // Logger.error('PermissionDeniedException: %s', error.message);
            this.response.status(403).json({ error: error.message });
            break;
          case 'CatalogValidationError':
            // Logger.error(error.message);
            this.response.status(422).json({ error: JSON.parse(error.message) });
            break;
          default:
            // Logger.error(error.message);
            this.response.status(501).json({ error: 'unable to process request!, please try later' });
            break;
        }
      }
}