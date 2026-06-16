import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { RequestLoggingMiddleware } from './request-logging.middleware';
import { Request, Response, NextFunction } from 'express';
import { EventEmitter } from 'events';

describe('RequestLoggingMiddleware', () => {
  let middleware: RequestLoggingMiddleware;
  let logSpy: jest.SpyInstance;
  let warnSpy: jest.SpyInstance;
  let errorSpy: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestLoggingMiddleware],
    }).compile();

    middleware = module.get<RequestLoggingMiddleware>(RequestLoggingMiddleware);

    logSpy = jest.spyOn(middleware['logger'], 'log').mockImplementation();
    warnSpy = jest.spyOn(middleware['logger'], 'warn').mockImplementation();
    errorSpy = jest.spyOn(middleware['logger'], 'error').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });

  it('should log with logger.log for 2xx status', (done) => {
    const mockResponse = new EventEmitter() as unknown as Response;
    mockResponse.statusCode = 200;

    const mockRequest = {
      method: 'GET',
      path: '/api/loans/123',
    } as unknown as Request;

    const next = jest.fn();

    middleware.use(mockRequest, mockResponse, next as NextFunction);

    expect(next).toHaveBeenCalled();

    (mockResponse as EventEmitter).emit('finish');

    setImmediate(() => {
      expect(logSpy).toHaveBeenCalled();
      const logMessage = logSpy.mock.calls[0][0];
      expect(logMessage).toContain('GET');
      expect(logMessage).toContain('/api/loans/123');
      expect(logMessage).toContain('200');
      expect(logMessage).toMatch(/\d+ms/);
      done();
    });
  });

  it('should log with logger.warn for 4xx status', (done) => {
    const mockResponse = new EventEmitter() as unknown as Response;
    mockResponse.statusCode = 404;

    const mockRequest = {
      method: 'POST',
      path: '/api/loans',
    } as unknown as Request;

    const next = jest.fn();

    middleware.use(mockRequest, mockResponse, next as NextFunction);

    expect(next).toHaveBeenCalled();

    (mockResponse as EventEmitter).emit('finish');

    setImmediate(() => {
      expect(warnSpy).toHaveBeenCalled();
      const warnMessage = warnSpy.mock.calls[0][0];
      expect(warnMessage).toContain('POST');
      expect(warnMessage).toContain('/api/loans');
      expect(warnMessage).toContain('404');
      expect(warnMessage).toMatch(/\d+ms/);
      done();
    });
  });

  it('should log with logger.error for 5xx status', (done) => {
    const mockResponse = new EventEmitter() as unknown as Response;
    mockResponse.statusCode = 500;

    const mockRequest = {
      method: 'PUT',
      path: '/api/loans/123',
    } as unknown as Request;

    const next = jest.fn();

    middleware.use(mockRequest, mockResponse, next as NextFunction);

    expect(next).toHaveBeenCalled();

    (mockResponse as EventEmitter).emit('finish');

    setImmediate(() => {
      expect(errorSpy).toHaveBeenCalled();
      const errorMessage = errorSpy.mock.calls[0][0];
      expect(errorMessage).toContain('PUT');
      expect(errorMessage).toContain('/api/loans/123');
      expect(errorMessage).toContain('500');
      expect(errorMessage).toMatch(/\d+ms/);
      done();
    });
  });

  it('should call next() immediately', () => {
    const mockResponse = new EventEmitter() as unknown as Response;
    mockResponse.statusCode = 200;

    const mockRequest = {
      method: 'GET',
      path: '/api/loans',
    } as unknown as Request;

    const next = jest.fn();

    middleware.use(mockRequest, mockResponse, next as NextFunction);

    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should include timing in log message', (done) => {
    const mockResponse = new EventEmitter() as unknown as Response;
    mockResponse.statusCode = 200;

    const mockRequest = {
      method: 'GET',
      path: '/api/loans',
    } as unknown as Request;

    const next = jest.fn();

    middleware.use(mockRequest, mockResponse, next as NextFunction);

    setTimeout(() => {
      (mockResponse as EventEmitter).emit('finish');

      setImmediate(() => {
        expect(logSpy).toHaveBeenCalled();
        const logMessage = logSpy.mock.calls[0][0];
        expect(logMessage).toMatch(/\d+ms/);
        done();
      });
    }, 10);
  });
});
