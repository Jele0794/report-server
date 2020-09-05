import { Controller, Get, Header, Res } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import { Response } from 'express';

@Controller('chrome')
export class ChromeController {

  @Get()
  async getHello(@Res() res: Response) {
    const browser = await puppeteer.launch({
      ignoreHTTPSErrors: true,
      dumpio: false,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    }) //.catch(e => console.log('Error launching chrome', e));
    const page = await browser.newPage();
    const url = 'https://google.com';
    console.log(url)
    await page.goto(url, {waitUntil: ['load', 'domcontentloaded']});
    // await page.waitForNavigation({waitUntil: 'networkidle0'});
    const pdf = await page.pdf();
    fs.writeFileSync('tmp/file.pdf', pdf/*Buffer.from(, 'binary')*/)
    res.type('pdf');
    res.set('Content-Disposition', `attachment; filename="archivo.pdf"`);
    res.send(pdf)
    // return
    // return

  }

}
