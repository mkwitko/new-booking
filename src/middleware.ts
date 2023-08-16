import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // TODO alterar para variavel de ambiente
  const regexPattern = `CognitoIdentityServiceProvider\.qe617fek7o0k1b4fkb77g3l2h\.[^.]+\.(idToken)`;

  const regex = new RegExp(regexPattern);

  const cookies = request.cookies.getAll().map((each) => {
    return each.name;
  });

  let isAuth = false;
  if (cookies.length > 0)
    cookies.forEach((e: any) => {
      if (e.match(regex)?.length > 0) isAuth = true;
    });

  //   if (!isAuth) {
  //     if (request.url.includes('/home')) {
  //       return NextResponse.redirect(new URL('/auth', request.url));
  //     }
  //   }

  //   if (isAuth) {
  //     if (request.url.includes('/auth')) {
  //       return NextResponse.redirect(new URL('/home', request.url));
  //     }
  //   }

  return NextResponse.next();
}

export const config = { matcher: '/((?!.*\\.).*)' };
